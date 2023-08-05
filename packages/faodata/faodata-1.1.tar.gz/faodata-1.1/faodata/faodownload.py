''' Download FAO data '''
import re
import requests
import numpy as np
import pandas as pd

__version__ = '0.1.0'
__fao_url__ = 'http://data.fao.org/developers/'
__fao_url__ += 'api/v1/en/resources'

def __getitems(jsoncode):
    ''' Convert json code to dataframe '''
    try:
        items = jsoncode['result']['list']['items']

        # Convert to list if only one items
        if isinstance(items, dict):
            items = [items]

        # Convert to list
        datajs = [it for it in items]

        # Retrieve number of items
        total = jsoncode['result']['list']['total']
        returned = jsoncode['result']['list']['page']
        returned *= jsoncode['result']['list']['pageSize']

    except (KeyError, TypeError):
        return None, 0, 0

    # Convert to dataframes
    data = pd.DataFrame(datajs)

    return data, total, returned


def get_databases():
    ''' List of FAO databases

    Returns
    -----------
    db : pandas.core.frame.DataFrame
        List of FAO databases. Columns of the data frame are
        * label: FAO label
        * uri: weblink the FAO website
        * uuid: Unique identifier
        * mnemonic: Short version of the FAO label

    Example
    -----------
    >>> from faodata import faodownload
    >>> db = faodownload.get_databases()
    >>> db.columns
    Index([u'label', u'uri', u'urn', u'uuid', u'mnemonic'], dtype='object')
    '''

    url = '{0}/databases.json'.format(__fao_url__)

    req = requests.get(url)

    jsoncode = req.json()
    databases, total, ret = __getitems(jsoncode)
    databases['mnemonic'] = databases['urn'].apply(lambda x: \
            re.sub('.*\\:', '', x))

    return databases


def get_datasets(database):
    ''' List of the dataset in a given FAO database

    Parameters
    -----------
    database : str
        Database mnemonic (e.g. 'faostat')

    Returns
    -----------
    ds : pandas.core.frame.DataFrame
        List of FAO databasets. Columns of the data frame are
        * _version_: Version of the dataset
        * database: Database name
        * description: Plain text description of the dataset
        * label: Short name of the dataset
        * mnemonic: FAO code for the dataset
        * uri: Weblink in the FAO website

    Example
    -----------
    >>> from faodata import faodownload
    >>> ds = faodownload.get_datasets('faostat')

    '''

    url = '{0}/{1}/datasets.json'.format(__fao_url__, database)

    params = {'fields': 'mnemonic,label@en,' \
                'description@en, uri'}

    req = requests.get(url, params=params)
    jsoncode = req.json()
    datasets, total, ret = __getitems(jsoncode)

    cols = ['description', 'label', 'mnemonic', 'uri']
    try:
        datasets = datasets.loc[:, cols]
    except (KeyError, AttributeError):
        return None

    return datasets


def get_fields(database, dataset):
    ''' Get info related to a particular dataset

    Parameters
    -----------
    database : str
        Database mnemonic (e.g. 'faostat')
    dataset : str
        Dataset mnemonic (e.g. 'crop-prod')

    Returns
    -----------
    fields : pandas.core.frame.DataFrame
        List of fields in dataset

    Example
    -----------
    >>> from faodata import faodownload
    >>> database = 'faostat'
    >>> dataset = 'crop-prod'
    >>> fields = faodownload.get_fields(database, dataset)

    '''

    url = '{0}/{1}/{2}'.format(__fao_url__, database, dataset)

    params = {'fields': 'mnemonic, label@en, unitMeasure, uri'}

    # Get measures
    req = requests.get('{0}/measures.json?'.format(url), params=params)
    jsoncode = req.json()
    fields, total, ret = __getitems(jsoncode)

    try:
        fields = fields.loc[:, ['mnemonic', 'label', 'unitMeasure', 'uri']]
    except (KeyError, AttributeError):
        return None

    return fields


def get_data(database, dataset, field, country=None, year=None):
    ''' Get data from specific a field in a dataset

    Parameters
    -----------
    database : str
        Database mnemonic (e.g. 'faostat')
    dataset : str
        Dataset mnemonic (e.g. 'crop-prod')
    field : str
        Field mnemonic (e.g. 'm5510')
    country : str
        ISO3 country code (optional, if none returns data for all countries)
    year : int
        Year (optional, if none returns data for all years)

    Returns
    -----------
    fields : pandas.core.frame.DataFrame
        List of fields in dataset

    Example
    -----------
    >>> from faodata import faodownload
    >>> database = 'faostat'
    >>> dataset = 'crop-prod'
    >>> field = 'm5511'
    >>> df = faodownload.get_data(database, dataset, field)
    '''

    url = '%s/%s/%s' % (__fao_url__, database, dataset)

    params = {
        'fields':('year,cnt.iso3 ' + \
            'as country,item as item, {0} as value').format(field),
        'page': 1,
        'pageSize':50
    }

    if not country is None:
        params.update({'filter':'cnt.iso3 eq {0}'.format(country)})

    if not year is None:
        if not 'filter' in params:
            params.update({'filter':'year eq {0}'.format(year)})

        else:
            params['filter'] = '{0} and year eq {1}'.format( \
                    params['filter'], year)

    # Get data - first pass
    req = requests.get('{0}/facts.json?'.format(url), params=params)
    jsoncode = req.json()
    data, total, ret = __getitems(jsoncode)

    # Get data - second pass
    # with updates on the number of pages
    if total > ret:
        params['pageSize'] = total

        req = requests.get('{0}/facts.json?'.format(url), params=params)
        jsoncode = req.json()
        data, total, ret = __getitems(jsoncode)

    if data is None:
        return data

    # Convert value to float
    try:
        data['value'] = data['value'].astype(float)
    except KeyError:
        return None

    # Remove data with no country
    idx = data['country'] != 'null'
    idx = idx & (data['value'] >= 0)
    if np.sum(idx) == 0:
        return None

    data = data[idx]

    return data


import os


def form_es_query_body(es_query_body, fields, filters=False):
    """Structure the elastic search query body."""
    for field in fields:
        es_query_body['query']['multi_match']['fields'].append(field)

    if filters:
        filters_list = filters.split(',')

        for filters_item in filters_list:
            filter_obj = {
                'term': {
                    'filters': filters_item,
                }
            }

            es_query_body['filter']['bool']['must'].append(filter_obj)


def get_elastic_body(filters=False):
    body = {}
    body['filters'] = []

    if filters:
        for filter_item in filters:
            body['filters'].append(filter_item)

    return body

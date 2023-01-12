#
# test creation of the user
#
GET {{API_URL}}/users
HTTP/* *
[Asserts]
status == 200
[Captures]
user_id: jsonpath "$.result.data[0]._key"

GET {{API_URL}}/users/{{user_id}}
HTTP/* *
[Asserts]
status == 200

#
# test creation of the user
#
GET {{API_URL}}/stores
HTTP/* *
[Asserts]
status == 200
[Captures]
store_id: jsonpath "$.result.data[0]._key"

GET {{API_URL}}/stores/{{store_id}}
HTTP/* *
[Asserts]
status == 200

#
# Getting list of categories
#
GET {{API_URL}}/categories

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/categories?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25



#
# test creation of the category fail on empty json
#
POST {{API_URL}}/categories
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the category fail on wrong payload
#
POST {{API_URL}}/categories
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the category
#
POST {{API_URL}}/categories
{
    "storeId":"{{store_id}}",
    "title": "Children",
    "description": "All for Children"
}

HTTP/* *
[Asserts]
status == 200
[Captures]
category_id: jsonpath "$.result"

#
# failing with sending empty body
#
POST {{API_URL}}/categories/{{category_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/categories/{{category_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405

#
# fail with sending wrong body
#
POST {{API_URL}}/categories/{{category_id}}
{
    "title": "Modified category title"
}

HTTP/* *
[Asserts]
status == 405

#
# verify category record
#
GET {{API_URL}}/categories/{{category_id}}


HTTP/* *
[Asserts]
jsonpath "$.result.data._key" == {{category_id}}

#
# deleting the created category
#
DELETE {{API_URL}}/categories/{{category_id}}

HTTP/* *
[Asserts]
status == 200




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
# Getting list of stores
#
GET {{API_URL}}/stores

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/stores?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25

#
# test creation of the store fail on empty json
#
POST {{API_URL}}/stores
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the store fail on wrong payload
#
POST {{API_URL}}/stores
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the store
#
POST {{API_URL}}/stores
{
    "title": "e_shoes",
    "description": "My awesome shoe store",
    "owner": "{{user_id}}"
}

HTTP/* *
[Asserts]
status == 200
[Captures]
store_id: jsonpath "$.result"

#
# failing with sending empty body
#
POST {{API_URL}}/stores/{{store_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/stores/{{store_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405


#
# fail with sending wrong body
#
POST {{API_URL}}/stores/{{store_id}}
{
    "title": "not a e store"
}

HTTP/* *
[Asserts]
status == 405

#
# verify store record
#
GET {{API_URL}}/stores/{{store_id}}


HTTP/* *
[Asserts]
jsonpath "$.result.data._key" == {{store_id}}

#
# deleting the created store
#
DELETE {{API_URL}}/stores/{{store_id}}

HTTP/* *
[Asserts]
status == 200





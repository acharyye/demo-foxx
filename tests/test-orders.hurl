#
# test creation of the user
#
GET {{API_URL}}/users
HTTP/* *
[Asserts]
status == 403
[Captures]
user_id: jsonpath "$.result.data[0]._key"

GET {{API_URL}}/users/{{user_id}}
HTTP/* *
[Asserts]
status == 200


#
# test creation of the store
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
# Getting list of orders
#
GET {{API_URL}}/orders

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/orders?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25

#
# test creation of the order fail on empty json
#
POST {{API_URL}}/orders
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the category fail on wrong payload
#
POST {{API_URL}}/orders
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the category
#
POST {{API_URL}}/orders
{
    "storeId": "{{store_id}}",
    "userId": "{{user_id}}",
    "billing": {},
    "shipping": {},
    "items": [
       "165789182",
       "165914545"
    ],
    "notes": "URGENT delivery"
}

HTTP/* *
[Asserts]
status == 200
[Captures]
order_id: jsonpath "$.result"

#
# failing with sending empty body
#
POST {{API_URL}}/orders/{{order_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/orders/{{order_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405

#
# fail with sending wrong body
#
POST {{API_URL}}/orders/{{order_id}}
{
    "title": "Modified category title"
}

HTTP/* *
[Asserts]
status == 405

#
# verify category record
#
GET {{API_URL}}/orders/{{order_id}}


HTTP/* *
[Asserts]
jsonpath "$.result.data._key" == {{order_id}}

#
# deleting the created order
#
DELETE {{API_URL}}/orders/{{order_id}}

HTTP/* *
[Asserts]
status == 200






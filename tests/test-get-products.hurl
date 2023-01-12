#
# Getting list of products
#
GET {{API_URL}}/products

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/products?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25

#
# test creation of the product fail on empty json
#
POST {{API_URL}}/products
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the product fail on wrong payload
#
POST {{API_URL}}/products
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the product
#
POST {{API_URL}}/products
{
    "sku": "PLO-PSH07",
    "title": "Polo Shirt",
    "price": 89.98
}

HTTP/* *
[Asserts]
status == 200
[Captures]
product_id: jsonpath "$.result"

#
# failing with sending empty body
#
POST {{API_URL}}/products/{{product_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/products/{{product_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405

#
# fail with sending wrong body
#
POST {{API_URL}}/products/{{product_id}}
{
    "title": "Modified product title"
}

HTTP/* *
[Asserts]
status == 405

#
# verify product record
#
GET {{API_URL}}/products/{{product_id}}


HTTP/* *
[Asserts]
jsonpath "$.result.data._key" == {{product_id}}

#
# deleting the created product
#
DELETE {{API_URL}}/products/{{product_id}}

HTTP/* *
[Asserts]
status == 200





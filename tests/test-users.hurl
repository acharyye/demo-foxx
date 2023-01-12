#
# Getting list of users
#
GET {{API_URL}}/users

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/users?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25

#
# test creation of the user fail on empty json
#
POST {{API_URL}}/users
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the user fail on wrong payload
#
POST {{API_URL}}/users
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the user
#
POST {{API_URL}}/users
{
    "username": "04431akm.char@gmail.com",
    "password": "demoakmyrat",
    "firstName": "Akmyrat",
    "lastName": "Charyyev"
}

HTTP/* *
[Asserts]
status == 200
[Captures]
user_id: jsonpath "$.result"

#
# Create user with the existing username should fail
#
POST {{API_URL}}/users
{
          "username": "akm.char@gmail.com",
          "password": "demoakmyrat",
          "firstName": "Akmyrat",
          "lastName": "Charyyev"
}

HTTP/* *
[Asserts]
status == 409

#
# failing with sending empty body
#
POST {{API_URL}}/users/{{user_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/users/{{user_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405


# fail with sending wrong body
#
POST {{API_URL}}/users/{{user_id}}
{
    "title": "Modified product title"
}

HTTP/* *
[Asserts]
status == 405

#
# verify user record
#
GET {{API_URL}}/users/{{user_id}}

HTTP/* *
[Asserts]
jsonpath "$.result.data[0]._key" == {{user_id}}

#
# deleting the created user
#
DELETE {{API_URL}}/users/{{user_id}}

HTTP/* *
[Asserts]
status == 200

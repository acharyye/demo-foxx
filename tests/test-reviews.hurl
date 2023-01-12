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
# Getting list of reviews
#
GET {{API_URL}}/reviews

HTTP/* *

[Asserts]
status == 200
jsonpath "$.result.data" count > 0

#
# PageSize test
#
GET {{API_URL}}/reviews?pageSize=25

HTTP/* *

[Asserts]

status == 200
jsonpath "$.result.data" count <= 25


#
# test creation of the review fail on empty json
#
POST {{API_URL}}/reviews
{
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the review fail on wrong payload
#
POST {{API_URL}}/reviews
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 400

#
# test creation of the review
#
POST {{API_URL}}/reviews
{
    "author":"{{user_id}}",
    "title": "ab_Children",
    "description": "All for Children"
}

HTTP/* *
[Asserts]
status == 200
[Captures]
review_id: jsonpath "$.result"

#
# failing with sending empty body
#
POST {{API_URL}}/reviews/{{review_id}}

HTTP/* *
[Asserts]
status == 405

#
# failing with sending wrong body
#
POST {{API_URL}}/reviews/{{review_id}}
{
    "debug": true
}

HTTP/* *
[Asserts]
status == 405

#
# fail with sending wrong body
#
POST {{API_URL}}/reviews/{{review_id}}
{
    "title": "Modified category title"
}

HTTP/* *
[Asserts]
status == 405

#
# verify review record
#
GET {{API_URL}}/reviews/{{review_id}}


HTTP/* *
[Asserts]
jsonpath "$.result.data._key" == {{review_id}}

#
# deleting the created review
#
DELETE {{API_URL}}/reviews/{{review_id}}

HTTP/* *
[Asserts]
status == 200

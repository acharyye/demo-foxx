const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update user by $id',

    body: {
        model: joi.object({
            username: joi.string().required(),
            password: joi.string().required(), // do not know which data type is used for password
            firstName: joi.string().required(),
            lastName: joi.string().required()
        }).required()
    },
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [user] = get('users', id).toArray();
        if (!user)
        {
            res.throw(404, 'product not exists');
            return;
        }

        const [result] = update('users', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
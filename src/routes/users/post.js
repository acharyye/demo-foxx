const {query} = require('@arangodb');
const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create user',

    body: {
        model: joi.object({
            username: joi.string().required(),
            password: joi.string().required(), // do not know which data type is used for password
            firstName: joi.string().required(),
            lastName: joi.string().required()
        }).required(),
        description: 'Creating new user'
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert, get} = module.context;

        const [result] = query`
        for user in users
            filter user.username == ${req.body.username}
        return user`.toArray();

        if (result)
        {
            res.throw(409, 'Already exists');
        }

        const [qr] = insert('users', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
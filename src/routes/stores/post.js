const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create airport',

    body: {
        model: joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            owner: joi.string().required()
        }).required()
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert} = module.context;
        const [qr] = insert('stores', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
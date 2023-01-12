const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create order',

    body: {
        model: joi.object({
            storeId: joi.string().required(),
            userId: joi.string().required(),
            billing: joi.object().required(),
            shipping: joi.object().required(),
            items: joi.array().items(joi.string()).required(),
            notes: joi.string().required()

        }).required()
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert} = module.context;
        const [qr] = insert('orders', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create product',

    body: {
        model: joi.object({
            sku: joi.string().required(),
            title: joi.string().required(),
            price: joi.number().required()

        }).required()
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert} = module.context;
        const [qr] = insert('products', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
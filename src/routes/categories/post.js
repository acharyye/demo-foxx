const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create category',

    body: {
        model: joi.object({
            storeId: joi.string().required(),
            title: joi.string().required(),
            description: joi.string().required()

        }).required()
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert} = module.context;
        const [qr] = insert('categories', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
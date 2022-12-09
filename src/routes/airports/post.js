const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create airport',

    body: {
        model: joi.object({
            name: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().required(),
            country: joi.string().required(),
            lat: joi.number().required(),
            long: joi.number().required(),
            vip: joi.boolean().required()
        }).required()
    },

    error: [
        {'409': 'Already exists'}
    ],

    handler: (req, res) =>
    {
        const {insert} = module.context;
        const [qr] = insert('airports', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
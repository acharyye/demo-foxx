const joi = require('joi');
const crypto = require('@arangodb/crypto');

module.exports = {
    contentType: 'application/json',
    name: 'Create review',

    body: {
        model: joi.object({
            author: joi.string().required(),
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
        const [qr] = insert('reviews', {
            ...req.body
        }).toArray();

        res.send({result: qr._key});
    }
};
const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update airport by $id',

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
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [airport] = get('airports', id).toArray();
        if (!airport)
        {
            res.throw(404, 'airport not exists');
            return;
        }

        const [result] = update('airports', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
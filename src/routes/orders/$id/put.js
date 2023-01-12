const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update order by $id',

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
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [order] = get('orders', id).toArray();
        if (!order)
        {
            res.throw(404, 'order not exists');
            return;
        }

        const [result] = update('orders', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
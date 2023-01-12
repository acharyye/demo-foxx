const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update product by $id',

    body: {
        model: joi.object({
            sku: joi.string().required(),
            title: joi.string().required(),
            price: joi.number().required()
        }).required()
    },
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [product] = get('products', id).toArray();
        if (!product)
        {
            res.throw(404, 'product not exists');
            return;
        }

        const [result] = update('products', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
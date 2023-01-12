const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove product',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [product] = get('products', id).toArray();
        if (!product)
        {
            res.throw(404, 'product not found');
            return;
        }

        const [result] = remove('products', id).toArray();

        res.send({
            result: result._key
        });
    }
};
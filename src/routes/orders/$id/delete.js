const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove order',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [order] = get('orders', id).toArray();
        if (!order)
        {
            res.throw(404, 'order not found');
            return;
        }

        const [result] = remove('orders', id).toArray();

        res.send({
            result: result._key
        });
    }
};
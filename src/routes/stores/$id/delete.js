const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove store',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [airport] = get('stores', id).toArray();
        if (!airport)
        {
            res.throw(404, 'store not found');
            return;
        }

        const [result] = remove('stores', id).toArray();

        res.send({
            result: result._key
        });
    }
};
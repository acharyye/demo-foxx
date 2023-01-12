const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove category',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [category] = get('categories', id).toArray();
        if (!category)
        {
            res.throw(404, 'category not found');
            return;
        }

        const [result] = remove('categories', id).toArray();

        res.send({
            result: result._key
        });
    }
};
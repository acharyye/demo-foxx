const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove airport',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [airport] = get('airports', id).toArray();
        if (!airport)
        {
            res.throw(404, 'airport not found');
            return;
        }

        const [result] = remove('airports', id).toArray();

        res.send({
            result: result._key
        });
    }
};
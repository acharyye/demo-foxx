const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove review',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [review] = get('reviews', id).toArray();
        if (!review)
        {
            res.throw(404, 'review not found');
            return;
        }

        const [result] = remove('reviews', id).toArray();

        res.send({
            result: result._key
        });
    }
};
const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Remove user',
    body: null,
    handler(req, res)
    {
        const {id} = req.pathParams;

        const {remove, get} = module.context;

        const [user] = get('users', id).toArray();
        if (!user)
        {
            res.throw(404, 'user not found');
            return;
        }

        const [result] = remove('users', id).toArray();

        res.send({
            result: result._key
        });
    }
};
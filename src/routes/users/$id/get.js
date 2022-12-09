const {aql, query, time} = require('@arangodb');
module.exports = {
    contentType: 'application/json',
    name: 'Get user by id',
    handler: (req, res) =>
    {
        const {filter} = module.context.utils;

        const start = time();


        const {id} = req.pathParams;

        const [result] = query`
        for doc in users
        filter doc._key == ${id}
        return merge(unset(doc, '_id', '_rev'), {debug: true})
        `.toArray()


        res.send({
            result,
            execTime: time() - start
        });
    }
};
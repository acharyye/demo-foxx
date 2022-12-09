const {aql, query, time} = require('@arangodb');

module.exports = {
    contentType: 'application/json',
    name: 'Echo',
    handler: (req, res) =>
    {
        const {q, skip = 0, pageSize = 25} = req.queryParams;

        const result = query`FOR doc in airports
            //filter doc.vip == true
            limit ${skip},${pageSize}
            return doc
        `.toArray();

        res.send({
            result
        });
    }
};
const {aql, query, time} = require('@arangodb');

module.exports = {
    contentType: 'application/json',
    name: 'Echo',
    handler: (req, res) =>
    {
        const {q, skip = 0, pageSize = 25} = req.queryParams;

        const queryResult = query`
        let skip=${Number(skip)}
        let pageSize=${Number(pageSize)}
        
        let ds = (
        for doc in products sort doc._key desc limit skip, pageSize
        Return merge(unset(doc, "_id", "_rev"), {}))
        
          RETURN {data: ds, pageSize: ${pageSize}, skip: ${skip} }          
        `.toArray()[0];

        res.send({
            result: queryResult
        });
    }
};
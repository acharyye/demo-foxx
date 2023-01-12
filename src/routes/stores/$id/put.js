const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'delete airport by $id',

    body: {
        model: joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            owner: joi.string().required()
        }).required()
    },
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [store] = get('stores', id).toArray();
        if (!store)
        {
            res.throw(404, 'store not exists');
            return;
        }

        const [result] = update('stores', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
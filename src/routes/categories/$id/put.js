const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update category by $id',

    body: {
        model: joi.object({
            storeId: joi.string().required(),
            title: joi.string().required(),
            description: joi.string().required()
        }).required()
    },
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [category] = get('categories', id).toArray();
        if (!category)
        {
            res.throw(404, 'category not exists');
            return;
        }

        const [result] = update('categories', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
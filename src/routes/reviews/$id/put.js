const {aql, query, time} = require('@arangodb');
const joi = require('joi');

module.exports = {
    contentType: 'application/json',
    name: 'update review by $id',

    body: {
        model: joi.object({
            author: joi.string().required(),
            title: joi.string().required(),
            description: joi.string().required()
        }).required()
    },
    handler: (req, res) =>
    {
        console.log(req);

        const {id} = req.pathParams;

        const {update, get} = module.context;

        const [review] = get('reviews', id).toArray();
        if (!review)
        {
            res.throw(404, 'review not exists');
            return;
        }

        const [result] = update('reviews', id, req.body).toArray();

        res.send({
            result: result._key
        });

    }
};
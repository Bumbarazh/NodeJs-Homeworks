const Joi = require('joi');

const { CAR_MODEL } = require('../../configs/regexp');

module.exports = Joi.object({
    model: Joi.string().required().pattern(CAR_MODEL),
    user_id: Joi.number().required()
});

const Joi = require('joi');

const { PASSWORD, EMAIL } = require('../../configs/regexp');

module.exports = Joi.object({
    email: Joi.string().required().pattern(EMAIL),
    password: Joi.string().required().pattern(PASSWORD)
});

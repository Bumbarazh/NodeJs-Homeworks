const Joi = require('joi');

const { MAX_AGE, MIN_AGE } = require('../../constants/constants');

const { EMAIL, PASSWORD } = require('../../configs/regexp');

module.exports = Joi.object({
    email: Joi.string().required().pattern(EMAIL),
    nickname:
        Joi.string()
            .required().min(2)
            .max(45),
    password: Joi.string().required().pattern(PASSWORD),
    age: Joi.number().min(MIN_AGE).max(MAX_AGE)
});

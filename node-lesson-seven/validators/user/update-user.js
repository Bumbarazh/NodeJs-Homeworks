const Joi = require('joi');

module.exports = Joi.object({
    nickname: Joi.string().required().min(2).max(45),
});

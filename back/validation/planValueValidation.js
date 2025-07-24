const Joi = require("joi");

exports.validatePlanValueInput = (data) => {
  const schema = Joi.object({
    planTier: Joi.string().required(),
    modules: Joi.object({
      opd: Joi.number().min(0),
      ipd: Joi.number().min(0),
      lab: Joi.number().min(0),
      mentalHealth: Joi.number().min(0),
    }),
    addOns: Joi.array().items(Joi.string()),
  });

  return schema.validate(data);
};

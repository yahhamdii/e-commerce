import Joi from 'joi';

export default function validateUser(user) {
  const schema = {
    firstName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.string(),
    role: Joi.string(),
    lastName: Joi.string(),
  };

  return Joi.validate(user, schema);
}

import Joi from 'joi';

const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = Joi.object({
  email: Joi.string().email().required().regex(new RegExp(regex)),
});

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const result = schema.validate({ email });
  return result.error ? false : true;
}

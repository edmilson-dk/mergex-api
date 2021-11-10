import Joi from 'joi';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const nameRegex = /^[a-zA-Z]+$/;

const emailSchema = Joi.object({
  email: Joi.string().email().required().regex(new RegExp(emailRegex)),
});

const nameSchema = Joi.object({
  name: Joi.string().required().regex(new RegExp(nameRegex)).min(3).max(30),
});

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const result = emailSchema.validate({ email });
  return result.error ? false : true;
}

export function isValidName(name: string): boolean {
  if (!name) return false;
  const result = nameSchema.validate({ name });
  return result.error ? false : true;
}

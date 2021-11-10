import Joi from 'joi';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// name may contain spaces
const nameRegex = /^[a-zA-Z0-9 ]+$/;
// username start with @ and not contain space
const userNameRegex = /^@[a-zA-Z0-9_]{3,30}$/;

const emailSchema = Joi.object({
  email: Joi.string().email().required().regex(new RegExp(emailRegex)),
});
const nameSchema = Joi.object({
  name: Joi.string().required().regex(new RegExp(nameRegex)).min(3).max(30),
});
const usernameSchema = Joi.object({
  username: Joi.string().required().regex(new RegExp(userNameRegex)).min(3).max(30),
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

export function isValidUsername(username: string): boolean {
  if (!username) return false;
  const result = usernameSchema.validate({ username });
  return result.error ? false : true;
}

import Joi from 'joi';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// name may contain spaces
const nameRegex = /^[a-zA-Z0-9 ]+$/;
// username start with @ and not contain space
const userNameRegex = /^@[a-zA-Z0-9_]{2,30}$/;
// password not contain space
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,30}$/;
const bioRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,200}$/;
// github official username validator
const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const emailSchema = Joi.object({
  email: Joi.string().email().required().regex(new RegExp(emailRegex)),
});
const nameSchema = Joi.object({
  name: Joi.string().required().regex(new RegExp(nameRegex)).min(2).max(30),
});
const usernameSchema = Joi.object({
  username: Joi.string().required().regex(new RegExp(userNameRegex)).min(2).max(30),
});
const passwordSchema = Joi.object({
  password: Joi.string().required().regex(new RegExp(passwordRegex)).min(8).max(30),
});
const bioSchema = Joi.object({
  bio: Joi.string().required().regex(new RegExp(bioRegex)).min(0).max(200),
});
const githubUsernameSchema = Joi.object({
  githubUsername: Joi.string().required().regex(new RegExp(githubUsernameRegex)).min(1).max(38),
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

export function isValidPassword(password: string): boolean {
  if (!password) return false;
  const result = passwordSchema.validate({ password });
  return result.error ? false : true;
}

export function isValidBio(bio: string): boolean {
  if (!bio) return false;
  const result = bioSchema.validate({ bio });
  return result.error ? false : true;
}

export function isValidGithubUsername(githubUsername: string): boolean {
  if (!githubUsername) return false;
  const result = githubUsernameSchema.validate({ githubUsername });
  return result.error ? false : true;
}

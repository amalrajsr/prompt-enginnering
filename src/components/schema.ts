import Joi from "joi";

export const passwordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
};
export const registerSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'string.empty': 'First name is required' }),
  lastName: Joi.string().required().messages({ 'string.empty': 'Last name is required' }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().min(8).required().custom((value, helpers) => {
    if (passwordStrength(value) === 'weak') {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Password strength validation').messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'any.invalid': 'Password is too weak. Use a mix of letters, numbers, and symbols.',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Please confirm your password',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
});
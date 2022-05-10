import * as joi from 'joi';

export default joi.object({
  email: joi.string().email().empty().messages({
    'string.empty': '400|All fields must be filled',
    'string.email': '401|Incorrect email or password',
  }),
  password: joi.string().min(6).empty().messages({
    'string.empty': '400|All fields must be filled',
    'string.min': '401|Incorrect email or password',
  }),
});

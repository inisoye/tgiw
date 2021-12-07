import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(5432).required(),

  SPOTIFY_CLIENT_ID: Joi.string().required(),
  SPOTIFY_CLIENT_SECRET: Joi.string().required(),
  SPOTIFY_REDIRECT_URI: Joi.string().required(),
  SPOTIFY_USER_ID: Joi.number().required(),
  SPOTIFY_AUTH_STATE: Joi.string().required(),
});

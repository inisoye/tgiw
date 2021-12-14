import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(5432).required(),
  NODE_ENV: Joi.string().required(),

  SPOTIFY_CLIENT_ID: Joi.string().required(),
  SPOTIFY_CLIENT_SECRET: Joi.string().required(),
  SPOTIFY_REDIRECT_URI: Joi.string().required(),
  SPOTIFY_USER_ID: Joi.number().required(),
  SPOTIFY_AUTH_STATE: Joi.string().required(),
  SPOTIFY_AUTH_STATE_KEY: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});

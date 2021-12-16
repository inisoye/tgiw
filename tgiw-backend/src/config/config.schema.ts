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

  FIREBASE_TYPE: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.number().unsafe().required(),
  FIREBASE_AUTH_URI: Joi.string().required(),
  FIREBASE_TOKEN_URI: Joi.string().required(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
  FIREBASE_CLIENT_X509_CERT_URL: Joi.string().required(),
});

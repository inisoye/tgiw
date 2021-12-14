export default () => ({
  port: parseInt(process.env.PORT, 10) || 3456,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    userId: process.env.SPOTIFY_USER_ID,
    authState: process.env.SPOTIFY_AUTH_STATE,
    authStateKey: process.env.SPOTIFY_AUTH_STATE_KEY,
  },
});

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3456,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    userId: process.env.SPOTIFY_USER_ID,
    authState: process.env.SPOTIFY_AUTH_STATE,
  },
});

export default () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
    },
    jwt: {
      secret: process.env.SECRET_TOKEN,
      expiresInAccessToken: process.env.EXPIRESIN_ACCESS_TOKEN,
      expiresInRefreshToken: process.env.EXPIRESIN_REFRESH_TOKEN
    },
});
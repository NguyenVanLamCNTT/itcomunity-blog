"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
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
        expiresInRefreshToken: process.env.EXPIRESIN_REFRESH_TOKEN,
    },
    email: {
        host: process.env.MAIL_HOST,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
});
//# sourceMappingURL=configuration.js.map
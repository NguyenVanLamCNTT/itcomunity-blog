declare const _default: () => {
    port: number;
    database: {
        username: string;
        password: string;
        port: string;
        host: string;
        name: string;
    };
    jwt: {
        secret: string;
        expiresInAccessToken: string;
        expiresInRefreshToken: string;
    };
    email: {
        host: string;
        user: string;
        password: string;
        from: string;
    };
    redis: {
        host: string;
        port: string;
        password: string;
    };
};
export default _default;

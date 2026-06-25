process.env.NODE_ENV = "test";
process.env.PORT = "3001";

process.env.DATABASE_URL ??=
    "postgresql://flowdesk:flowdesk_dev_password@localhost:5432/flowdesk_test?schema=public";

process.env.JWT_ACCESS_SECRET ??=
    "test-access-secret-at-least-32-characters-long";

process.env.JWT_REFRESH_SECRET ??=
    "test-refresh-secret-at-least-32-characters-long";

process.env.JWT_ACCESS_EXPIRES_IN_SECONDS ??= "900";
process.env.JWT_REFRESH_EXPIRES_IN_SECONDS ??= "604800";
export const APP_CONSTANTS = {
    API_PREFIX: "/api/v1",
    DOCS_PATH: "/docs",
    SHUTDOWN_TIMEOUT_MS: 10_000
} as const;

export const PAGINATION_CONSTANTS = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
} as const;

export const AUTH_CONSTANTS = {
    PASSWORD_MIN_LENGTH: 8,
    ACCESS_TOKEN_COOKIE_NAME: "flowdesk_access_token",
    REFRESH_TOKEN_COOKIE_NAME: "flowdesk_refresh_token"
} as const;
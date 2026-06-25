import jwt, {
    type JwtPayload,
    type SignOptions
} from "jsonwebtoken";

import { env } from "../../config/env.js";

export interface TokenPayload {
    userId: string;
    role: string;
}

function signToken(
    payload: TokenPayload,
    secret: string,
    expiresInSeconds: number
): string {
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn: expiresInSeconds
    };

    return jwt.sign(payload, secret, options);
}

export function createAccessToken(
    payload: TokenPayload
): string {
    return signToken(
        payload,
        env.JWT_ACCESS_SECRET,
        env.JWT_ACCESS_EXPIRES_IN_SECONDS
    );
}

export function createRefreshToken(
    payload: TokenPayload
): string {
    return signToken(
        payload,
        env.JWT_REFRESH_SECRET,
        env.JWT_REFRESH_EXPIRES_IN_SECONDS
    );
}

export function verifyAccessToken(
    token: string
): TokenPayload {
    const decoded = jwt.verify(
        token,
        env.JWT_ACCESS_SECRET,
        {
            algorithms: ["HS256"]
        }
    );

    return parseTokenPayload(decoded);
}

export function verifyRefreshToken(
    token: string
): TokenPayload {
    const decoded = jwt.verify(
        token,
        env.JWT_REFRESH_SECRET,
        {
            algorithms: ["HS256"]
        }
    );

    return parseTokenPayload(decoded);
}

function parseTokenPayload(
    decoded: string | JwtPayload
): TokenPayload {
    if (
        typeof decoded === "string" ||
        typeof decoded.userId !== "string" ||
        typeof decoded.role !== "string"
    ) {
        throw new Error("Invalid token payload");
    }

    return {
        userId: decoded.userId,
        role: decoded.role
    };
}
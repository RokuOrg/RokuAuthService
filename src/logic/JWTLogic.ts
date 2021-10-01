import {decode, encode, TAlgorithm} from "jwt-simple";
import {DecodeResult, EncodeResult, ExpirationStatus, PartialSession, Session} from "../models/JWT.interface";

export function encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {
    const algorithm: TAlgorithm = "HS512";

    const issued = Date.now();
    const expires = issued + 15 * 60 * 1000;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}

export function decodeSession(secretKey: string, tokenString: string): DecodeResult {
    const algorithm: TAlgorithm = "HS512";

    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (_e) {
        const e: Error = _e;

        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw e;
    }

    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();

    if (token.expires > now) return "active";

    const threeHoursAfterExpiration = token.expires + 3 * 60 * 60 * 1000;

    if (threeHoursAfterExpiration > now) return "grace";

    return "expired";
}
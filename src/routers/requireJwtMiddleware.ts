import { Request, Response, NextFunction } from "express";
import {DecodeResult, ExpirationStatus, Session} from "../models/JWT.interface";
import {checkExpirationStatus, decodeSession, encodeSession} from "../logic/JWTLogic";

const Secret_Key = process.env.ROKU_SECRET_KEY

export function requireJwtMiddleware(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(200).json({
        succes: false,
        message: message
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = request.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    const decodedSession: DecodeResult = decodeSession(Secret_Key, header);

    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = encodeSession(Secret_Key, decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        response.setHeader(responseHeader, token);
    } else {
        session = decodedSession.session;
    }

    response.locals = {
        ...response.locals,
        session: session
    };

    next();
}
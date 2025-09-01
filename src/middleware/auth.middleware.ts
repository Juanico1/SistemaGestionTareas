import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
* Authentication middleware for protected routes.
*
* Verifies that the request includes a valid JWT token in the `Authorization` header.
* - If the token is present and valid, it adds `userId` to the `req` object and continues with `next()`.
* - If the token is missing, invalid, or expired, it returns a 401 (Unauthorized) error.
*
* Requirements:
* - The header must be in the format: `Authorization: Bearer <token>`.
* - The token is signed using the `JWT_SECRET` environment variable.
* 
*/
export interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.replace("Bearer ", "") : undefined;
    if (!token) 
        return res.status(401).json({ message: "Token is missing" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.userId = payload.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
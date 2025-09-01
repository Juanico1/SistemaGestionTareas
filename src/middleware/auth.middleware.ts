import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
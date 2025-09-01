import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(409).json({ message: "Email already in use" });

        const encryptedKey = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, password: encryptedKey
        });
        return res.status(201).json({ id: user._id, email: user.email });
    } catch (err) {
        return res.status(500).json({ message: "Server error", detail: err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(401).json({ message: "User Not Found" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) 
            return res.status(401).json({ message: "Incorrect Password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        return res.json({ msg: 'Authenticated User', token });
    } catch (err) {
        return res.status(500).json({ message: "Server error", detail: err });
    }
};

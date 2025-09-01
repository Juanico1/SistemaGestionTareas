import { Schema, model, Document } from "mongoose";

/**
 * Represent a new user
 * - email: required, unique and in lowercase
 * - password : required
 */
export interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default model<IUser>("User", userSchema);
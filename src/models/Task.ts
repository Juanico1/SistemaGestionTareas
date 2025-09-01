import { Schema, model, Document, Types } from "mongoose";

/**
 * Represent a task associated with a user
 * - title: required
 * - description: optional
 * - dueDate: deadline
 * - status: pending | in_progress | done
 */
export interface ITask extends Document {
  owner: Types.ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  status: "pending" | "in_progress" | "done";
}

const taskSchema = new Schema<ITask>({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "in_progress", "done"], default: "pending" }
}, { timestamps: true });

export default model<ITask>("Task", taskSchema);
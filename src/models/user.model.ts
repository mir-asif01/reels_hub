import mongoose, { model, models } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    await bcrypt.hash(this.password, 10);
  }
});

export const User = models?.User || model<IUser>("User", userSchema);

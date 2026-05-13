import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

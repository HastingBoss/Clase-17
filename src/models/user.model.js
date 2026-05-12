import mongoose from "mongoose";

// Esquema
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

// Modelo
const User = mongoose.model("User", userSchema);

export default User;

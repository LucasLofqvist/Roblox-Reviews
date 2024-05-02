import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    birthYear: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, required: true},
    role: {type: String, required: true, enum: ["User", "Moderator", "Owner"]}
}, {collection: "users"});

export default mongoose.model("Users", userSchema);
import mongoose from "mongoose";
import validator from "validator";

const gameSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    //This can have performance implications, if we use alot of images
    thumbnailUrl: {type: String, required: true, validate: [validator.isURL, "Invalid URL"]},
    created: {type: Date, required: true},
    genre: {type: String, required: true},
    gameUrl: {type: String, required: true, validate: [validator.isURL, "Invalid URL"]}
}, {collection: "games"});

export default mongoose.model("Games", gameSchema);
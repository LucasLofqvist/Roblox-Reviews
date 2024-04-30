import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    //This can have performance implications, if we use alot of images
    imageData: {type: Buffer},
    created: {type: Date, required: true}
}, {collection: "games"});

export default mongoose.model("Games", gameSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    gameId: {type: Schema.Types.ObjectId, required: true},
    userName: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 10},
    reviewText: {type: String, required: true},
    creationDate: {type: Date, required: true}
}, {collection: "reviews"});

reviewSchema.index({gameId: 1, userName: 1}, {unique: true});

export default mongoose.model("Reviews", reviewSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    gameId: {type: Schema.Types.ObjectId, required: true},
    username: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 10},
    reviewText: {type: String, required: true},
    createdAt: {type: Date, required: true},
    violence: {type: Boolean, required: true},
    //Enum makes sure that the suggestedAge only can take one of these four values.
    suggestedAge: {type: String, required: true, enum: ["All", "9+", "13+", "17+"]}
}, {collection: "reviews"});

reviewSchema.index({gameId: 1, userName: 1}, {unique: true});

export default mongoose.model("Reviews", reviewSchema);
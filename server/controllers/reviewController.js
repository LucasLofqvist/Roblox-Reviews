import Review from "../models/reviewModel.js";

export const allReviews = async (req, res) => {
    try {
        const response = await Review.find();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};
import Review from "../models/reviewModel.js";
import Game from "../models/gameModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

//Find all reviews
export const allReviews = async (req, res) => {
    try {
        const response = await Review.find();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};


//Find specific review based on gameId and username
export const findReview = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const username = req.params.username;

        //Probably redundant but might be good practice
        if(!gameId || !username) {
            return res.status(400).json({message: "Missing required query information."})
        }

        const response = await Review.findOne({ gameId: gameId, username: username });

        if(!response) {
            return res.status(404).json({message: `No review found on game with id ${gameId}, by the user ${username}`});
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};

//Find reviews based on gameId
export const findGameReviews = async (req, res) => {
    try {
        const gameId = req.params.gameId;

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            return res.status(400).json({ message: "Invalid gameId" });
        }

        const response = await Review.aggregate([
            {
                //Where the reviews gameId field match the params gameId variable.
                $match: {
                    gameId: new mongoose.Types.ObjectId(gameId)
                    //new mongoose.Types.ObjectId(gameId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "username",
                    foreignField: "username",
                    as: "userDocuments"
                }
            },
            {
                $unwind: "$userDocuments"
            },
            {
                $project: {
                    _id: 1,
                    gameId: 1,
                    user: {
                        username: "$userDocuments.username",
                        birthYear: "$userDocuments.birthYear",
                        role: "$userDocuments.role"
                    },
                    rating: 1,
                    reviewText: 1,
                    createdAt: 1,
                    violence: 1,
                    suggestedAge: 1
                }
            },
            {
                $group: {
                    _id: "$gameId",
                    reviews: { $push: "$$ROOT"},
                    count: { $count: {}},
                    averageRating: { $avg: "$rating"}
                }
            },
            {
                $addFields: {
                    averageRating: { $round: ["$averageRating", 0] } // Round the average rating
                }
            }
        ]);

        if(!response) {
            return res.status(404).json({message: `Cant find any reviews that are referencing a game with id: ${gameId}`});
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.message});
    }
};


//Add new review
export const addReview = async (req, res) => {

    if (!req.payload) {
        console.error("No token payload found in request.");
        res.status(400).json({message: "Unauthorized."});
    }

    try {
        const {gameId, username, rating, reviewText, violence, suggestedAge} = req.body;

        //Make sure strings and numbers fields are not undefined
        if (!gameId || !username || typeof rating !== "number" || !reviewText || !suggestedAge) {
            return res.status(400).json({message: "Missing required fields in the request body."});
        }

        //Make sure violence is a boolean value
        if (typeof violence !== "boolean") {
            return res.status(400).json({message: "The violence field needs to be a boolean value: true/false"});
        }

        //Check if the game referenced by the review exists in the game collection
        const gameExist = await Game.findOne({_id: gameId});
        if (!gameExist) {
            return res.status(400).json({message: "The gameId referenced by the review does not exist."});
        }

        const userExist = await User.findOne({username: username});
        if (!userExist) {
            return res.status(400).json({message: "The username referenced by the review does not exist."});
        }

        const newReview = new Review({
            gameId: gameId,
            username: username,
            rating: rating,
            reviewText: reviewText,
            createdAt: new Date(),
            violence: violence,
            suggestedAge: suggestedAge
        });

        await newReview.save();

        res.status(201).json({message: "Review succsessfully added!", data: newReview});
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.message});
    }
};
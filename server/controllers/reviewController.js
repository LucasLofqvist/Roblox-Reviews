import Review from "../models/reviewModel.js";
import Game from "../models/gameModel.js";
import User from "../models/userModel.js";

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

        if(!gameId) {
            return res.status(400).json({message: "Missing required query information."})
        };

        const response = await Review.find({gameId: gameId});

        if(!response) {
            return res.status(404).json({message: `Cant find any reviews that are referencing a game with id: ${gameId}`});
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};


//Add new review
export const addReview = async (req, res) => {
    try {
        const {gameId, username, rating, reviewText, violence, suggestedAge} = req.body;

        console.log(gameId, username, typeof rating, reviewText, violence, suggestedAge);

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

        console.log(1, username);
        console.log(2, gameId);

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
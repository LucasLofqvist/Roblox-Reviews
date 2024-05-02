import Game from "../models/gameModel.js";

//Return all documents in games
export const allGames = async (req, res) => {
    try {
        const response = await Game.find();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};

//Return specific game based on query parameters
export const findGame = async (req, res) => {
    try {
        const gameTitle = req.params.title;

        //Might be unessesary since this function will only be used if there is a parameter in the request.
        if(!gameTitle) {
            return res.status(400).json({message: "Could not fetch. No game title specified."})
        }

        const response = await Game.findOne({ title: gameTitle });

        if(!response) {
            return res.status(404).json({message: `No game with the title: ${gameTitle} was found!`});
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};

//Add new game
export const addGame = async (req, res) => {
    const{title, description, thumbnailUrl, created, genre, gameUrl} = req.body;

    if(!title || !description || !created || !genre || !thumbnailUrl || !gameUrl) {
        return res.status(400).json({message: "Missing required fields in the body."});
    }

    //Accepts image references from Roblox.com
    if(typeof thumbnailUrl === "string") {
        const validUrlEnding = thumbnailUrl.endsWith("/Webp");

        if(!validUrlEnding) {
            return res.status(400).json({message: "Invalid thumbnail URL! Must end with /Webp"});
        }
    }

    try {
        const newGame = new Game({
            title: title,
            description: description,
            thumbnailUrl: thumbnailUrl,
            created: created,
            genre: genre,
            gameUrl: gameUrl
        });

        await newGame.save();

        res.status(201).json({message: "Game succsessfully added!", data: newGame});

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.message});
    }
};
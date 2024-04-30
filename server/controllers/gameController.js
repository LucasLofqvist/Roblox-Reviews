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
        console.log(gameTitle);

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
    const{title, description, imageData, created} = req.body;

    if(!title || !description || !created) {
        return res.status(400).json({message: "Missing required fields in the body."});
    }

    //binaryData will be null if no imageData is recieved in the post request.
    const binaryData = null;

    if (imageData){
        //Convert imagedata to buffer
        binaryData = Buffer.from(imageData, "base64");
    }

    try {
        const newGame = new Game({
            title: title,
            description: description,
            imageData: binaryData,
            created: created
        });

        await newGame.save();

        res.status(201).json({message: "Game succsessfully added!", data: newGame});

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};
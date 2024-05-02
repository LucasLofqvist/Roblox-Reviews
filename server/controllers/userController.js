import User from "../models/userModel.js";

export const allUsers = async (req, res) => {
    try {
        const response = await User.find();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.errmsg});
    }
};

export const findUser = async (req, res) => {
    //const 
};
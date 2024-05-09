import { hashPassword } from "../middleware/brcypt.js";
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

    try {
        const username = req.params.username;

    const user = await User.findOne({username: username});

    if (!user) {
        return res.status(404).json({message: `No user with username: ${username} found.`});
    }

    res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: "Something went wrong!", error: error.message});
    }
};

export const addUser = async (req, res) => {
    try {
        const {username, birthYear, email, password} = req.body;

        if (!username || !birthYear || !email || !password) {
            return res.status(400).json({message: "Missing required fields in the request body."});
        };

        //Hashing password through Bcrypt
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username: username,
            birthYear: birthYear,
            email: email,
            password: hashedPassword,
            createdAt: new Date(),
            role: "User"
        });

        await newUser.save();
        res.status(201).json({success: true, message: "User successfully added!", data: newUser});

    } catch (error) {
        res.status(500).json({success: true, message: "Something went wrong!", error: error.message});
    }
};
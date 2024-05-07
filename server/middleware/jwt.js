import jwt from jsonwebtoken;
import User from "../models/userModel.js";
import { comparePassword } from "./brcypt.js";
import dotenv from dotenv;
dotenv.process();

export async function returnToken(req, res, next) {
    const payload = req.user;
    const secretKey = process.env.SECRETKEY;
    const expiresIn = "2h";
    const token = await createToken(payload, secretKey, { expiresIn } );
    if (token) {
        res.json({ token });
    } else {
        console.log("Invalid token")
        res.status(500).json({ message: "Error while logging in" })
    }
}

async function createToken(payload, secretKey, expiresIn) {
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
    } catch (error) {
        console.error("Error while creating token", error)
        return null;
    }

}

export async function verifyToken(req, res, next) {
    try {
        const headerAuth = req.header("authorization");
        if (!headerAuth.startsWith("Bearer")) {
            res.status(401).json({ message: "Unauthorized" })
        }

        const token = headerAuth.split(" ")[1];
        const secretKey = process.env.SECRETKEY;
        const payload = await jwt.verify(token, secretKey);
        req.payload = payload;
    } catch (error) {
        console.error("Error while verifying Token", error);
        res.status(401).json({ message: "Unauthorized" })
    }
}

async function authenticateUser(username, password) {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error("Wrong username")
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            throw new Error("Wrong password");
        }

        const userPayload = {
            username: user.username,
            role: user.role
        }

        return userPayload;
    } catch (error) {
        console.error("Error while authenticating user", error);
        return null;
    }
}

export async function authenticate(req, res, next) {
    const { username, password } = req.body;

    const user = await authenticateUser(username, password);
    if(user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: "Wrong username or password." });
    }
}
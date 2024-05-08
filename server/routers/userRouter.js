import express from "express";
import { addUser, allUsers, findUser } from "../controllers/userController.js";
import { authenticate, returnToken, verifyToken } from "../middleware/jwt.js";

export const userRouter = express.Router();

userRouter.get("/", allUsers);

userRouter.get("/:username", findUser);

userRouter.post("/", addUser);

userRouter.post("/login", authenticate, returnToken);

//Test route, should be removed later
// userRouter.get("/token/verify", verifyToken, (req, res) => {
//     const payload = req.payload;
//     console.log(payload);
//     res.json({message: "Token verified!", payload});
// });
import express from "express";
import { addUser, allUsers, findUser } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", allUsers);

userRouter.get("/:username", findUser);

userRouter.post("/", addUser);
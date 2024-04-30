import express from "express";
import {allGames, findGame, addGame} from "../controllers/gameController.js";

export const gameRouter = express.Router();

gameRouter.get("/", allGames);

gameRouter.get("/:title", findGame);

gameRouter.post("/", addGame);


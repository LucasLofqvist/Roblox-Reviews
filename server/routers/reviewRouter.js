import express from "express";
import { addReview, allReviews, findGameReviews, findReview } from "../controllers/reviewController.js";

export const reviewRouter = express.Router();

reviewRouter.get("/", allReviews);

reviewRouter.get("/:gameId", findGameReviews);

reviewRouter.get("/:gameId/:username", findReview);

reviewRouter.post("/", addReview);
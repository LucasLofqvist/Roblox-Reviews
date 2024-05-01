import express from "express";
import { addReview, allReviews, findReview } from "../controllers/reviewController.js";

export const reviewRouter = express.Router();

reviewRouter.get("/", allReviews);

reviewRouter.get("/:gameId/:username", findReview);

reviewRouter.post("/", addReview);
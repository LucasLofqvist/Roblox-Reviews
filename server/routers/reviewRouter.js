import express from "express";
import { allReviews } from "../controllers/reviewController.js";

export const reviewRouter = express.Router();

reviewRouter.get("/", allReviews);
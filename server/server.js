import express from "express";
import cors from "cors";
import { config } from "dotenv";
import path from "path";

import { gameRouter } from "./routers/gameRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { userRouter } from "./routers/userRouter.js";

import { connectToMongo } from "./dbConnection.js";

config();

const port = process.env.PORT || 3000;
const app = express();

//Hittade inte den här pathen automatiskt, kanske är något fel
app.use(express.static("../client/build"));
app.use(express.json());
app.use(cors());

//Mount routers
app.use("/api/games", gameRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

// Serve the React app for any other route (React Router will handle client-side routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../client/build", "index.html"));
});

//Connect to database
connectToMongo();

app.listen(port, () => {
    console.log(`Server is listening to http://localhost:${port}..`);
});
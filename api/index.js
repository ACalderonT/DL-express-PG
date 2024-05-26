import express from "express";
import cors from "cors";
import likemeRoute from "./routes/likeme.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", likemeRoute)

app.listen(3000, console.log("Listening on http://localhost:3000"));

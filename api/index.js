import { likemeModel } from "./models/likeme.model.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
	try {
		const posts = await likemeModel.findAll();

		return res.json(posts);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error " });
	}
});

app.post("/posts", async (req, res) => {
	const post = req.body;

	if (!post.titulo) {
		return res.status(400).json({ message: "El titulo es requerido" });
	}

	const newPost = {
		titulo: post.titulo,
		img: post?.url,
		descripcion: post?.descripcion,
		likes: post?.likes,
	};

	try {
		const response = await likemeModel.create(newPost);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json("Internal server error");
	}
});

app.listen(3000, console.log("Listening on http://localhost:3000"));

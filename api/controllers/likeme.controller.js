import { likemeModel } from "../models/likeme.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const read = async (req, res) => {
	try {
		const posts = await likemeModel.findAll();
		return res.json(posts);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const create = async (req, res) => {
	const post = req.body;

	if (!post.titulo) {
		return res.status(400).json({ message: "El titulo es requerido" });
	}

	const newPost = {
		titulo: post.titulo,
		img: post?.url,
		descripcion: post?.descripcion,
		likes: 0,
	};

	try {
		const response = await likemeModel.create(newPost);
		res.json(response);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		res.status(500).json({ message: "Internal server error" });
	}
};

const update = async (req, res) => {
	const { id } = req.params;

	try {
		const post = likemeModel.update(id);

		if (!post) {
			return res.status(404).json({ message: "Post Not Found" });
		}

		return res.json(post);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		return res.status(500).json({ message: "Internal server error" });
	}
};

const remove = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await likemeModel.remove(id);

		if (!post) {
			return res.status(404).json({ message: "Post Not Found" });
		}

		return res.json(post);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		return res.status(500).json({ message: "Internal server error" });
	}
};

export const likemeController = {
	read,
	create,
	update,
	remove,
};

import { pool } from "../database/connection.js";

const findAll = async () => {
	const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
	console.log("query: ", rows);
	return rows;
};

const create = async (post) => {
	const query =
		"INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING * ";
	const { rows } = await pool.query(query, [
		post.titulo,
		post.img,
		post.descripcion,
		post.likes,
	]);

	return rows[0];
};

const update = async (id) => {
	const query =
		"UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
	const { rows } = await pool.query(query, [id]);

	return rows[0];
};

const remove = async (id) => {
	const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
	const { rows } = await pool.query(query, [id]);

	return rows[0];
};

export const likemeModel = {
	findAll,
	create,
	update,
    remove,
};

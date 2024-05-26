import { likemeController } from "../controllers/likeme.controller.js";
import { Router } from "express";

const router = Router();

// GET /posts
router.get("/", likemeController.read);

// POST /posts
router.post("/", likemeController.create);

// PUT /posts/like/:id
router.put("/like/:id", likemeController.update);

// DELETE /posts/:id
router.delete("/:id", likemeController.remove);

export default router;

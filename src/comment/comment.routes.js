import { Router } from "express";
import { createComment, updateComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, updateCommentVaidator, deleteCommentVaidator } from "../middlewares/comment-validator.js";

const router = Router();

router.post("/createComment", createCommentValidator, createComment);

router.patch("/updateComment/:id", updateCommentVaidator, updateComment);

router.delete("/deleteComment/:id", deleteCommentVaidator, deleteComment);

export default router;
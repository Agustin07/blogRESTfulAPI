import {Router} from "express";
import * as postAction from "./Handler/Post/actions";
import * as commentAction from "./Handler/Comment/actions";

const router = Router();

router.get("/test", (req, res) => res.send("Hello world!") );

router.post("/posts", postAction.createPost );
router.get("/posts/:id", postAction.getPostById );
router.get("/posts", postAction.getAllPosts );
router.delete("/posts/:id", postAction.deletePost );
router.patch("/posts/:id", postAction.updatePost );

router.post("/posts/:id/comments", commentAction.createComment );
router.get("/posts/:id/comments/:idc", commentAction.getCommentById );
router.get("/posts/:id/comments", commentAction.getCommentsByPostId );
router.delete("/posts/:id/comments/:idc", commentAction.deleteComment );
router.patch("/posts/:id/comments/:idc", commentAction.updateComment );

router.use("*", (req, res) => { res.status(404).send("NOT FOUND!"); });

export default router;
import {Router} from "express";
import * as postAction from "./Handler/Post/actions";

const router = Router();

router.get("/test", (req, res) => res.send("Hello world!") );
router.post("/posts", postAction.createPost );
router.get("/posts/:id", postAction.getPostById );
router.get("/posts", postAction.getAllPosts );
router.delete("/posts/:id", postAction.deletePost );
router.patch("/posts/:id", postAction.updatePost );

router.use("*", (req, res) => { res.status(404).send("NOT FOUND!"); });

export default router;
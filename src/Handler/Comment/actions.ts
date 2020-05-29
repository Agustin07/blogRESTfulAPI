import { Request, Response } from "express";
import * as commentValidation from "./validation";
import {Post} from "../Post/schema";
import {Comment} from "./schema";
import mongoose from "mongoose";

export const createComment = async (req : Request, res : Response) : Promise<Response> => {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid post id!");
    if (post.isDeleted) return res.status(404).set("Content-Type", "text/plain").send("Post deleted!");

    const {error} = commentValidation.createValidation(req.body);
    if (error) return res.status(400).set("Content-Type", "text/plain").send(error.message);
    
    const comment = new Comment(req.body); 
    post.comments.push(comment);
    try {
		const result = await post.save();
		return res.status(200).set("Content-Type", "text/plain").send("Comment created!");
	}
	catch (e) {
		return res.status(404).set("Content-Type", "text/plain").send(e.message);
	}
};


export const getCommentById = async (req : Request, res : Response) : Promise<Response> => {
    const post = await Post.findOne({ _id : req.params.id, isDeleted : false },{ comments: { $elemMatch : { _id: req.params.idc } } });
    
    if( !post ) return res.status(404).set("Content-Type", "text/plain").send("Invalid post id!");
    if( post.comments.length as number === 0 ) return res.status(404).set("Content-Type", "text/plain").send("Invalid comment id!");
    if( post.comments[0].isDeleted ) return res.status(404).set("Content-Type", "text/plain").send("No found!");
    return res.status(200).json(post.comments[0]);
};

export const getCommentsByPostId = async (req : Request, res : Response) : Promise<Response> => {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid post id!");
    if( post.comments.length as number === 0) return res.status(404).set("Content-Type", "text/plain").send("This post does not have any comment!");
    const comments = post.comments.filter(cmmnt => (cmmnt.isDeleted === false ));
    return res.status(200).json(comments);
};

export const deleteComment = async (req : Request, res : Response) : Promise<Response> => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const idc = mongoose.Types.ObjectId(req.params.idc);
   
    const post = await Post.findOneAndUpdate({ _id : id, isDeleted : false, comments : { $elemMatch : {_id : idc} }},
        { $set: { "comments.$.isDeleted" : true } }, { new : true });

    return res.status(200).set("Content-Type", "text/plain").send("Deleted!");
};


export const updateComment = async (req : Request, res : Response) : Promise<Response> => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const idc = mongoose.Types.ObjectId(req.params.idc);

    const {error} = commentValidation.updateValidation(req.body);
    if (error) return res.status(400).set("Content-Type", "text/plain").send(error.message);
    
    try{
        const option = { new : true };
        const post = await Post.findOneAndUpdate({ _id : id, isDeleted : false, comments : { $elemMatch : {_id : idc} }},
            { $set: { "comments.$.content" : req.body.content } }, option);
        if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid id!");
        return res.status(200).json(post);
    }
    catch(e){
        return res.status(404).set("Content-Type", "text/plain").send(e.message);
    }
};



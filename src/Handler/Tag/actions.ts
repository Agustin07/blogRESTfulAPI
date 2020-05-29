import { Request, Response } from "express";
import {Post} from "../Post/schema";
import mongoose from "mongoose";

import Joi from "joi";

const createTagSchema = {
    tag : Joi.string().min(1).max(150).required()
};

export const createValidation = (tag : string) : Joi.ValidationResult<string> => { 
	return Joi.validate(tag, createTagSchema);
};

export const createTag = async (req : Request, res : Response) : Promise<Response> => {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid post id!");
    if (post.isDeleted) return res.status(404).set("Content-Type", "text/plain").send("Post deleted!");

    const {error} = createValidation(req.body);
    if (error) return res.status(400).set("Content-Type", "text/plain").send(error.message);

    post.tags.push(req.body.tag);
    try {
		const result = await post.save();
		return res.status(200).json(result);
	}
	catch (e) {
		return res.status(404).set("Content-Type", "text/plain").send(e.message);
	}
};

export const getAllTags = async (req : Request, res : Response) : Promise<Response> => {
    const post = await Post.findOne({ _id : req.params.id, isDeleted : false }).select('tags');
    if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid id!");
	if (post.isDeleted) return res.status(404).set("Content-Type", "text/plain").send("Post deleted!");
    return res.status(200).json(post.tags);
};

export const deleteTag = async (req : Request, res : Response) : Promise<Response> => {
    const option = { new : true };
    const post = await Post.findOneAndUpdate({ _id : req.params.id, isDeleted : false},
        { $pull: { tags: req.params.name } }, option);
    if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid post id!");
    return res.status(200).json(post);
};






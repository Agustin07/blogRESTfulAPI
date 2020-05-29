import { Request, Response } from "express";
import * as postValidation from "./validation";
import {Post} from "./schema";
import mongoose from "mongoose";

export const createPost = async (req : Request, res : Response) : Promise<Response> => {

	const { error } = postValidation.createValidation(req.body);
	if (error) return res.status(400).set("Content-Type", "text/plain").send(error.message);

	const post = new Post(req.body); 
	try {
		const result = await post.save();
		return res.status(201).location("/posts/"+result._id).set("Content-Type", "text/plain").send("Created!");
	}
	catch (e) {
		return res.status(404).set("Content-Type", "text/plain").send(e.message);
	}
};


export const getPostById = async (req : Request, res : Response) : Promise<Response> => {
	
	const post = await Post.findById(req.params.id);
	if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid id!");
	if (post.isDeleted) return res.status(404).set("Content-Type", "text/plain").send("Post deleted!");
	return res.status(200).json(post);
};

export const getAllPosts = async (req : Request, res : Response) : Promise<Response> => {
	const allPosts = await Post.find({ isDeleted : false});
	return res.status(200).json(allPosts);
};

export const deletePost = async (req : Request, res : Response) : Promise<Response> => {
	const id = mongoose.Types.ObjectId(req.params.id);
	try {
		const post = await Post.findOneAndUpdate( { _id : id  , isDeleted : false } , {
			$set : { isDeleted : true }});
		if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid id!");
		if(post.isDeleted) return res.status(200).json(post);
		return res.status(204).send();
	}
	catch (e){
		return res.status(404).set("Content-Type", "text/plain").send(e.message);
	}
};


export const updatePost = async (req : Request, res : Response) : Promise<Response> => {
	const id = mongoose.Types.ObjectId(req.params.id);

	const { error } = postValidation.updateValidation(req.body);
	if (error) return res.status(400).set("Content-Type", "text/plain").send(error.message);

	try {
		const option = { new: true };
		const post = await Post.findOneAndUpdate( { _id : id , isDeleted : false } , { $set : req.body }, option );
		if(!post) return res.status(404).set("Content-Type", "text/plain").send("Invalid id!");
		return res.status(200).json(post);
	}
	catch (e){
		return res.status(404).set("Content-Type", "text/plain").send(e.message);
	}	
};

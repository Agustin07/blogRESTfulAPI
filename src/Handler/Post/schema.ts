import mongoose = require("mongoose");
import {commentSchema} from "../Comment/schema";
import {IComment} from "../Comment/schema";
import {Schema} from "mongoose";

export  interface IPost extends mongoose.Document {
	_id : mongoose.Types.ObjectId,
	title : string,
	content : string,
	author : string,
	tags : [ string ],
	datePosted : Date,
	isDeleted : boolean,
	comments : [IComment]
}

export const postSchema = new mongoose.Schema({
	title : String,
	content : String,
	author : String,
	tags : [ String ],
	datePosted : { type : Date, default : Date.now },
	isDeleted : { type : Boolean, default : false },
	comments : [commentSchema]
});

export const Post = mongoose.model<IPost>("Post", postSchema);
import * as mongoose from "mongoose";

export interface IComment extends mongoose.Document {
	_id : mongoose.Types.ObjectId,
	comment : string,
	user: string,
	datePosted ?: Date,
	isDeleted ?:  boolean
}
 
export const commentSchema = new mongoose.Schema({
	comment : String,
	user: String,
	datePosted : { type : Date, default : Date.now },
	isDeleted : { type : Boolean, default : false }
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);

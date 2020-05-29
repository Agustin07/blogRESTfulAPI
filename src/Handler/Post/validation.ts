import Joi from "joi";

const createPostSchema = {
	title : Joi.string().min(3).max(100).required(),
	content : Joi.string().min(10).max(1024).required(),
	author : Joi.string().min(3).max(100).required(),
	tags : Joi.array()
};

const updatePostSchema = {
	title : Joi.string().min(3).max(100),
	content : Joi.string().min(10).max(1024),
	author : Joi.string().min(3).max(100),
};


export const createValidation = (post : string) : Joi.ValidationResult<string> => { 
	return Joi.validate(post, createPostSchema);
};

export const updateValidation = (post : string) : Joi.ValidationResult<string> => { 
	return Joi.validate(post, updatePostSchema);
};

import Joi from "joi";

const createCommentSchema = {
	content : Joi.string().min(1).max(500).required(),
	user : Joi.string().min(1).max(100).required(),
};

const updateCommentSchema = {
	content : Joi.string().min(1).max(1024).required(),
};


export const createValidation = (comment : string) : Joi.ValidationResult<string> => { 
	return Joi.validate(comment, createCommentSchema);
};

export const updateValidation = (comment : string) : Joi.ValidationResult<string> => { 
	return Joi.validate(comment, updateCommentSchema);
};

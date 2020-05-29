import express from "express";


export const requireJSON = (req : express.Request, res: express.Response , next : express.NextFunction ) : void | express.Response => {
	if ( ["PUT", "POST", "PATCH"].includes(req.method) && req.headers["content-type"] !== "application/json") return res.status(415).send("Server requires application/json");
	next();
};
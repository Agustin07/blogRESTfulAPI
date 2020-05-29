import express from "express";
import fs from "fs";

import { format } from "../utils";
import { port_listen } from "../index";

export const dailylog = (req : express.Request, res: express.Response , next : express.NextFunction ) : void => {
	const date = format(new Date());
	const mylog = fs.createWriteStream("logs/"+date.now+".txt", { flags: "a" });
	mylog.write(""+ date.time +" METHOD: "+req.method +"\n  REQUEST: "+req.hostname+":"+port_listen+req.originalUrl+"\n\n");
	next();
};


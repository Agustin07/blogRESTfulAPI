import express from "express";

import mongoose = require("mongoose");

import myRoutes from "./router";
import { dailylog } from "./middlewares/daily_log";
import { requireJSON } from "./middlewares/require_json";

mongoose.connect("mongodb://localhost/BlogAPI",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
	.then(()=> console.log("Connected!"))
	.catch(err => console.log("Could not connect!", err));

export const port_listen = 3000;
const app = express();

app.use(express.json());

app.use(dailylog);

app.use(requireJSON);

app.use(myRoutes);

app.listen(port_listen, () => console.log("Running..."));

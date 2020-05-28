import express from "express";

import myRoutes from "./router";

export const port_listen = 3000;
const app = express();

app.use(myRoutes);

app.listen(port_listen, () => console.log("Running..."));

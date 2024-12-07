import express from "express";
import { port } from "./src/config.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import morgan from "morgan";
import driversRoutes from "./src/routes/driversRoutes.js"
import clientRoutes from "./src/routes/clientRoutes.js"
import flotaRoutes from "./src/routes/flotaRoutes.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(usersRoutes);
app.use(driversRoutes);
app.use(clientRoutes);
app.use(flotaRoutes);
app.listen(port);

console.log("Server on port", port);
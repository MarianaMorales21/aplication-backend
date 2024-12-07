import express from "express";
import { port } from "./src/config.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import morgan from "morgan";
import driversRoutes from "./src/routes/driversRoutes.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(usersRoutes);
app.use(driversRoutes);
app.listen(port);

console.log("Server on port", port);
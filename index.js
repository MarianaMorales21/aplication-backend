import express from "express";
import { port } from "./src/config.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(usersRoutes);

app.listen(port);
console.log("Server on port", port);
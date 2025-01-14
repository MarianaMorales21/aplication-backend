import express from "express";
import { port } from "./src/config.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import morgan from "morgan";
import driversRoutes from "./src/routes/driversRoutes.js"
import clientRoutes from "./src/routes/clientRoutes.js"
import flotaRoutes from "./src/routes/flotaRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import dashboardRoutes from "./src/routes/authRoutes.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(usersRoutes);
app.use(driversRoutes);
app.use(clientRoutes);
app.use(flotaRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.listen(port);


console.log("Server on port", port);
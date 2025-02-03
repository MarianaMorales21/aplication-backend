import express from "express";
import { port } from "./src/config.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import morgan from "morgan";
import driversRoutes from "./src/routes/driversRoutes.js"
import clientRoutes from "./src/routes/clientRoutes.js"
import fleetRoutes from "./src/routes/fleetRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import dashboardRoutes from "./src/routes/dashboardRoutes.js"
import passwordRoutes from "./src/routes/passwordRoutes.js"
import cookieParser from 'cookie-parser';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(usersRoutes);
app.use(driversRoutes);
app.use(clientRoutes);
app.use(fleetRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(passwordRoutes);
app.listen(port);


console.log("Server on port", port);
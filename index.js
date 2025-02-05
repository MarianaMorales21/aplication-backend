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
import materialRoutes from "./src/routes/materialRoutes.js"
import orderRoutes from "./src/routes/orderRoutes.js"
import schedulesRoutes from "./src/routes/WorkingHoursRoutes.js"
import invoiceRoutes from "./src/routes/invoiceRoutes.js"
import userORMRoutes from "./src/routes/ORMusers.js"
import driverORMRoutes from "./src/routes/ORMdrivers.js"
import driverusersORM from "./src/routes/driverUserORM.js"
import cookieParser from 'cookie-parser';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(usersRoutes);
app.use(userORMRoutes);
app.use(driversRoutes);
app.use(driverORMRoutes);
app.use(clientRoutes);
app.use(fleetRoutes);
app.use(authRoutes);
app.use(driverusersORM);
app.use(dashboardRoutes);
app.use(passwordRoutes);
app.use(materialRoutes);
app.use(orderRoutes);
app.use(schedulesRoutes);
app.use(invoiceRoutes);
app.listen(port);


console.log("Server on port", port);
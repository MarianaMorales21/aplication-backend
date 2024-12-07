import { Router } from "express";
import { getClients, getClient, createClient} from "../controllers/clientControllers.js";

const router = Router();

router.get("/clients", getClients);
router.get('/clients/:id', getClient);
router.post('/clients', createClient);

export default router;
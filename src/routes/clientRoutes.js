import { Router } from "express";
import { getClients, getClient, createClient, updateClient, deleteClient } from "../controllers/clientControllers.js";
import { verifyClient, verifyAdmin } from "../middlewares/jwt.js";
const router = Router();

router.get("/clients", verifyClient, getClients);
router.get('/clients/:id', verifyClient, getClient);
router.post('/clients', verifyAdmin, createClient);
router.put('/clients/:id', verifyAdmin, updateClient);
router.delete('/clients/:id', verifyAdmin, deleteClient);
export default router;
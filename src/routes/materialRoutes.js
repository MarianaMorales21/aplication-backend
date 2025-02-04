import { Router } from "express";
import { getMaterial, getMaterials, updateMaterial, createMaterial, deleteMaterial } from "../controllers/materialControllers.js";

const router = Router();

router.get("/material", getMaterials);
router.get('/material/:id', getMaterial);
router.post("/material", createMaterial);
router.put("/material/:id", updateMaterial);
router.delete("/material/:id", deleteMaterial);

export default router
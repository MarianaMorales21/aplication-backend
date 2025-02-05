import express from 'express';
import {
    getBills,
    getBill,
    createBill,
    updateBill,
    deleteBill
} from '../controllers/invoiceControllers.js';
import { verifyClient, verifyAdmin } from '../middlewares/jwt.js';
const router = express.Router();

router.get('/bills', verifyAdmin, getBills);
router.get('/bills/:id', verifyClient, getBill);
router.post('/bills', verifyAdmin, createBill);
router.put('/bills/:id', verifyAdmin, updateBill);
router.delete('/bills/:id', verifyAdmin, deleteBill);

export default router;
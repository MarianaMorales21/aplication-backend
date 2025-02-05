import express from 'express';
import {
    getBills,
    getBill,
    createBill,
    updateBill,
    deleteBill,
    getPayment
} from '../controllers/invoiceControllers.js';
import { verifyClient, verifyAdmin } from '../middlewares/jwt.js';
const router = express.Router();
router.get('/payment_method', getPayment);
router.get('/bills', getBills);
router.get('/bills/:id', getBill);
router.post('/bills', createBill);
router.put('/bills/:id', updateBill);
router.delete('/bills/:id', deleteBill);

export default router;
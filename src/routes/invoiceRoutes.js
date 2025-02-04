import express from 'express';
import {
    getPaymentMethods,
    getBills,
    getBill,
    createBill,
    updateBill,
    deleteBill,
    getInvoiceDetails,
    getInvoiceDetail,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail
} from '../controllers/invoiceControllers.js';
import { verifyClient, verifyAdmin } from '../middlewares/jwt.js';
const router = express.Router();

router.get('/payment-methods', verifyClient, getPaymentMethods);
router.get('/bills', verifyAdmin, getBills);
router.get('/bills/:id', verifyClient, getBill);
router.post('/bills', verifyAdmin, createBill);
router.put('/bills/:id', verifyAdmin, updateBill);
router.delete('/bills/:id', verifyAdmin, deleteBill);
router.get('/invoice/details', verifyAdmin, getInvoiceDetails);
router.get('/invoice/details/:id', verifyClient, getInvoiceDetail);
router.post('/invoice/details', verifyAdmin, createInvoiceDetail);
router.put('/invoice/details/:id', verifyAdmin, updateInvoiceDetail);
router.delete('/invoice/details/:id', verifyAdmin, deleteInvoiceDetail);

export default router;
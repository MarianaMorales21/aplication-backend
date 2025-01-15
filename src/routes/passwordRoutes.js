import { Router } from 'express';
import { recover, resetpassword } from '../controllers/passwordControllers.js';

const router = Router();

router.post('/recover', recover);
router.post('/resetpassword/:token', resetpassword);

export default router;
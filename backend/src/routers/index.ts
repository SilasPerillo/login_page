import { Router } from 'express';
import LoginRouter from './Login.router';
import RegisterController from './Register.router'

const router = Router();

router.use('/login', LoginRouter);
router.use('/register', RegisterController);

export default router;
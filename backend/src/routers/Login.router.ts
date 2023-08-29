import { Router } from 'express';
import { LoginController } from '../controllers'

const LoginRouter = Router();

LoginRouter.post('/', (req, res) => LoginController.loginUser(req, res));

export default LoginRouter;
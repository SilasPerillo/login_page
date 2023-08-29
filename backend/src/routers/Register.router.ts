import { Router } from 'express';
import { RegisterController } from '../controllers'

const RegisterRouter = Router();

RegisterRouter.get('/all', (req, res) => RegisterController.getAllUsers(req, res));
RegisterRouter.get('/emp/:emp', (req, res) => RegisterController.getEmpUsers(req, res));
RegisterRouter.post('/newUser', (req, res) => RegisterController.registerNewUser(req, res));

export default RegisterRouter;
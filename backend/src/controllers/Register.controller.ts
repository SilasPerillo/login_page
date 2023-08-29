import { Request, Response } from 'express';
import { RegisterService } from '../services';

export default class RegisterController {
  static async registerNewUser (req: Request, res: Response) {
    const { body } = req
    const { statusCode, message } = await RegisterService.registerNewUser(body);

    return res.status(statusCode).json(message);
  }

  static async getEmpUsers (req: Request, res: Response) {
    const { emp } = req.params
    

    const { statusCode, message } = await RegisterService.getEmpUsers(emp);

    return res.status(statusCode).json(message);
    // return res.status(200).json(emp);
  }

  static async getAllUsers (_req: Request, res: Response) {
    const { statusCode, message } = await RegisterService.getAllUsers();

    return res.status(statusCode).json(message);
  }
}
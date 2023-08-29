import { Request, Response } from 'express';
import { LoginService } from '../services';

export default class LoginController {
  static async loginUser(req:  Request, res: Response) {
    const { body } = req;
    const { statusCode, message } = await LoginService.loginUser(body);

    return res.status(statusCode).json(message);
  }
}
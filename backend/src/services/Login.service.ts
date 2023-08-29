import { PasswordUtils } from '../utils/validatePassword';
import { LoginModel } from "../models"
import { badRequest, ok, unauthorized } from '../utils/httpHelpers';
import Token from '../utils/jwtToken'

interface LoginResponse {
  statusCode: number;
  message: any; // Especificar o tipo correto para a mensagem
}

export default class LoginService {
  static async loginUser(body: any): Promise<LoginResponse> {
    
    const { user, password } = body;
    
    if (!user || !password) return badRequest('All fields must be filled')
    
    const payload = await LoginModel.loginUser(body);

    if (!payload) return unauthorized('Incorrect email or password');

    const passValidation = await PasswordUtils.comparePasswords(password as string, payload.password as string);

    if (!passValidation) return unauthorized('Incorrect email or password');
    
    const { role } = payload

    const token = Token.createToken({ user, role });

    return ok({ ...payload, token })
  // "user": "master",
  // "password": "Master1!"
    
  }
}
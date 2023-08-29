import { RegisterModel } from '../models';
import { PasswordUtils } from '../utils/validatePassword'
import { ok, unauthorized, conflict, badRequest } from '../utils/httpHelpers';

interface PayloadBody {
  id_cpf: number;
  emp: string;
  user: string;
  email: string;
  role: string;
  password: string;
}

export default class RegisterService {
  static async getAllUsers () {
    const result = await RegisterModel.getAllUsers()

    return ok(result)
  }

  static async getEmpUsers (emp: string) {
    const result = await RegisterModel.getEmpUsers(emp);

    return ok(result);
  }

  static async registerNewUser (body: PayloadBody) {
    const { password } = body;

    const resultVerifyCpf = await RegisterModel.verifyId_cpf(body)

    if (resultVerifyCpf.length !== 0) return conflict("CPF already registered");

    if (!password) return unauthorized("Invalid password")

    const resultPassword = await PasswordUtils.hashPassword(password);
    console.log(resultPassword);

    const result = await RegisterModel.registerNewUser(body, resultPassword)

    if(!result) return badRequest("Bad Request")

    return ok({message: "Successfully registered user!"});
  }
}
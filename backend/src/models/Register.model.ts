import DatabaseManager from '../db/database';

interface User {
  id_cpf: number;
  emp: string;
  user: string;
  email: string;
  role: string;
}

export default class RegisterModel {
  static async getAllUsers(): Promise<User[]> {
    const getAllUsersQuery = `
      SELECT id_cpf, emp, user, email, role
      FROM users
    `;
    
    const db = DatabaseManager.getDatabase();
    const result = db?.exec(getAllUsersQuery);

    const users: User[] = [];

    if (result && result.length > 0 && result[0].values) {
      const columns: string[] = result[0].columns;
      
      result[0].values.forEach((userData: any[]) => {
        const userObject: any = {} as User;
        userData.forEach((value, index) => {
          userObject[columns[index]] = value;
        });
        users.push(userObject);
      });
    }

    return users;
  }

  static async getEmpUsers(emp: string): Promise<User[]> {
    const getAllUsersQuery = `
      SELECT id_cpf, emp, user, email, role
      FROM users
      WHERE emp = "${emp}"
    `;
    
    const db = DatabaseManager.getDatabase();
    const result = db?.exec(getAllUsersQuery);

    const users: User[] = [];

    if (result && result.length > 0 && result[0].values) {
      const columns: string[] = result[0].columns;
      
      result[0].values.forEach((userData: any[]) => {
        const userObject: any = {} as User;
        userData.forEach((value, index) => {
          userObject[columns[index]] = value;
        });
        users.push(userObject);
      });
    }

    return users;
  }

  // static async registerNewUser(newUser: User, password: string): Promise<void> {
  static async registerNewUser(newUser: User, password: string): Promise<any> {
    const db = DatabaseManager.getDatabase();

    const insertUserQuery = `
      INSERT INTO users (id_cpf, emp, user, email, role, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const insertParams = [
      newUser.id_cpf,
      newUser.emp,
      newUser.user,
      newUser.email,
      newUser.role,
      password,
    ];

    db?.run(insertUserQuery, insertParams);

    return { insertParams };
  }

  static async verifyId_cpf({ id_cpf }: User) {
    const getUser = `
    SELECT * FROM users
    WHERE id_cpf = '${id_cpf}'
  `;

  const db = DatabaseManager.getDatabase();
  const result = db?.exec(getUser);

  return result
  }
}
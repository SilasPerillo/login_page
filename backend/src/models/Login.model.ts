import DatabaseManager from '../db/database';

export default class LoginModel {
  static async loginUser(body: any) {
    const { user } = body;

    const getUser = `
      SELECT * FROM users
      WHERE user = '${user}'
    `;

    const db = DatabaseManager.getDatabase();
    const result = db?.exec(getUser);

    if (!result) return result;

    if (result && result.length > 0 && result[0].values && result[0].values.length > 0) {
      const columns = result[0].columns;
      const userData = result[0].values[0]; // Acessar o primeiro usuário do array
      
      const userObject: any = {};
      userData.forEach((value: any, index: number) => {
        userObject[columns[index]] = value;
      });

      // console.log(userObject);
      
      return userObject;
    }

    // throw new Error('Usuário não encontrado');
  }
}
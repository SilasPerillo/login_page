import * as fs from 'fs';
const initSqlJs = require('sql.js');

class DatabaseManager {
  private db: any = null; // Usar "any" temporariamente para evitar erros

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    const data = fs.readFileSync('db/mydatabase.sqlite');
    const SQL = await initSqlJs();
    this.db = new SQL.Database(new Uint8Array(data));

    this.createTableAndInsertData(); // Chamar a função após a inicialização
  }

  public getDatabase() {
    return this.db;
  }

  private createTableAndInsertData() {
    if (this.db) {
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
          id_cpf TEXT PRIMARY KEY,
          user TEXT,
          email TEXT,
          role TEXT,
          emp TEXT,
          password TEXT
        )
      `;
      
      const insertDataSQL = `
        INSERT INTO users (id_cpf, user, email, role, emp, password)
        VALUES
          ('11111111111', 'master', 'master@master.com', 'master', 'emp master', '$2a$10$12VCOaqS4Zpf3nST/hjjcuL2eUk9YWczBJv/xsODfBsbGKXB3/Lt6'),
          ('22222222222', 'admin', 'admin@admin.com', 'admin','emp admin', '$2a$10$kzVaWFBCSTx5CsCpPsf9reeo1R9mbdeJiFTdMHkqaij6qCDakE1Oq'),
          ('22222222223', 'admin', 'admin@admin.com', 'admin','emp admin', '$2a$10$kzVaWFBCSTx5CsCpPsf9reeo1R9mbdeJiFTdMHkqaij6qCDakE1Oq'),
          ('22222222224', 'admin', 'admin@admin.com', 'admin','emp admin', '$2a$10$kzVaWFBCSTx5CsCpPsf9reeo1R9mbdeJiFTdMHkqaij6qCDakE1Oq'),
          ('33333333333', 'user', 'user@user.com', 'user','emp user', '$2a$10$WFPa.JUbLLrDRT5pZ8cYAu3v/TI2HgZgnEBzMBb7opzzdS/pg2wxa')
      `;

      // user: 'master'; "password": "Master1!"
      // $2a$10$12VCOaqS4Zpf3nST/hjjcuL2eUk9YWczBJv/xsODfBsbGKXB3/Lt6

      // user: 'admin'; "password": "Admin1!"
      // $2a$10$kzVaWFBCSTx5CsCpPsf9reeo1R9mbdeJiFTdMHkqaij6qCDakE1Oq

      // user: 'user'; "password": "User1!"
      // $2a$10$WFPa.JUbLLrDRT5pZ8cYAu3v/TI2HgZgnEBzMBb7opzzdS/pg2wxa

      this.db.exec(createTableSQL);
      this.db.exec(insertDataSQL);
    }
  }

  public getUsers() {
    const query = 'SELECT * FROM users';
    const result = this.db?.exec(query);
  
    if (result && result.length > 0 && result[0].values) {
      const columns = result[0].columns;
      const users = result[0].values.map((row: any) => {
        const user: any = {};
        row.forEach((value: any, index: number) => {
          user[columns[index]] = value;
        });
        return user;
      });
  
      return users;
    }
  
    return [];
  }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
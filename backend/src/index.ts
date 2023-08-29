import express from 'express';
import router from './routers'
import databaseManager from './db/database';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Defina a origem do frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Defina os métodos permitidos
  credentials: true, // Permitir envio de cookies, cabeçalhos de autenticação, etc.
}));

app.use(router);

app.get('/', (_req, res) => {
  const users = databaseManager.getUsers();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
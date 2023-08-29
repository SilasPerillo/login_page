import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Master.css";
import getCookie from "../components/getCookie";

function Master() {
  const [isLoading, setIsLoading] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [erroPage, setErroPage] = useState(false);
  const [roleState, setRoleState] = useState("");
  const [empState, setEmpState] = useState("");
  const navigate = useNavigate();

  const redirectToRegister = () => {
    navigate("/register");
  }

  useEffect(() => {
    const fetchData = async () => {
      const role = getCookie('role');
      const emp = getCookie('emp');
      setRoleState(role);
      setEmpState(emp);
      setIsLoading(true);
      try {
        let response;
        if (role === "admin") {
          response = await axios.get(`http://localhost:3001/register/emp/${emp}`);
        } else {
          response = await axios.get("http://localhost:3001/register/all");
        }
        setListUsers(response.data);
      } catch (err) {
        console.error(err);
        setErroPage(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [empState, roleState]);

  console.log(roleState);
  console.log(empState);

  return (
    <div className="body-master">
      {erroPage && <div>ERRO NA PAGINA, REINICIE A APLICAÇÃO</div>}
      <div className="container-btn-master">
        <button
          className="btn-register"
          type="btn"
          onClick={redirectToRegister}
        >
          Cadastrar
        </button>
      </div>
      <div className="user-table">
        {isLoading ? (
          <div>... Carregando</div>
        ) : listUsers.length === 0 ? (
          <div>Nenhum usuário encontrado.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>emp</th>
                <th>user</th>
                <th>role</th>
                <th>email</th>
                <th>id_cpf</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.map((user) => (
                <tr key={user.id_cpf}>
                  <td>{user.emp}</td>
                  <td>{user.user}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.id_cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Master;
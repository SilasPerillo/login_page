import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [invalidData, setInvalidData] = useState(false)
  const [user, setUser] = useState({
    user: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setInvalidData(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [invalidData]);

  const handleShowPassToggle = () => {
    setShowPassword(!showPassword);
  }

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        user: user.user,
        password: user.password,
      });
      document.cookie = `role=${response.data.role}; path=/`; // Armazenar o role em um cookie
      document.cookie = `emp=${response.data.emp}; path=/`; // Armazenar o role em um cookie
      if(response.data.role === 'master') navigate("/master");
      if(response.data.role === 'admin') navigate("/master");
      if(response.data.role === 'user') navigate("/user");
    } catch (error) {
      if (error.response.status === 401) setInvalidData(true) 
    }
  }

  return (
    <div className="body-login">
      <div className="container-inputs-login">
        <label>
          Usuário:
          <input
            type="text"
            name="user"
            value={user.user}
            onChange={handleChange}
          />
        </label>
        <label>
          Senha:
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Digite sua senha"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <label>
            <div>
              <input
                className="input-show-pass"
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPassToggle}
                />
              Mostrar senha
            </div>
          </label>
        </label>
        { invalidData && <div className="validade-password-not">Usuário ou senha incorreto</div>}
        <div className="container-btn">
          <button
            className="btn-login"
            onClick={handleClick}
          >
            Entrar
          </button>
          </div>
      </div>
      <div>
        <div>
          user: master;
          password: Master1!
        </div>
        <div>
          user: admin;
          password: Admin1!
        </div>
        <div>
          user: user;
          password: User1!
        </div>
      </div>
    </div>
  )
}

export default Login
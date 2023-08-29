import { useNavigate } from "react-router-dom"
import "./Register.css"
import { useEffect, useState } from "react"
import axios from "axios";
import dataValidator from "../components/dataValidator"
import compareData from "../components/compareData"
import getCookie from "../components/getCookie"

function Register() {
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [stateData, setStateData] = useState({})
  const [cpfAlreadyRegistered, setCpfAlreadyRegistered ] = useState(false)
  const [dataUser, setDataUser] = useState({
    user: "",
    emp: "",
    id_cpf: "",
    role: "",
    email: "",
    password: "",
  });
  const [confirmData, setConfirmData] = useState({
    confirmEmail: "",
    confirmPassword: "",
  });

  const [activateData, setActivateData] = useState({
    activate: false,
    email: false,
    password: false,
  })

  const handleChangeConfirm = (event) => {
    const {name, value} = event.target;
    setConfirmData({ ...confirmData, [name]: value});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value});
    setStateData(dataValidator(dataUser));
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleGoBack = () => {
    nav(-1);
  };

  const handleRegister = async () => {
    const updatedActivateData = compareData(dataUser, confirmData);
    setActivateData(updatedActivateData);// http://localhost:3001/register/newUser
    try {
      await axios.post("http://localhost:3001/register/newUser",dataUser)
      nav(-1);
    } catch (err) {
      if (err.response.status === 409) return setCpfAlreadyRegistered(true);
      console.log(err);
    }
  }

  const specificEntries = () => {
    if (getCookie('role') === 'master') {
      return (
        <div>
          <label>
            Emp:
            <input
              type="text"
              name="emp"
              value={(dataUser.emp)}
              onChange={handleChange}
              />
          </label>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={(dataUser.role)}
              onChange={handleChange}
              />
          </label>
        </div>
        )
    }
    return false
  }

  useEffect(() => {
    setActivateData(compareData(dataUser, confirmData));
  }, [confirmData, dataUser]);

  useEffect(() => {
    setStateData(dataValidator(dataUser));
  }, [dataUser]);

  return (
    <div className="body-register">
      {cpfAlreadyRegistered && <div>CPF já cadastrado</div>}
      <div className="container-input-register">
        <label>
          Usuário:
          <input
            type="text"
            name="user"
            value={dataUser.user}
            onChange={handleChange}
          />
        </label>
        <label>
        id_cpf:
          <input
            type="text"
            name="id_cpf"
            maxLength={11}
            value={dataUser.id_cpf}
            onChange={handleChange}
          />
        </label>
        {specificEntries()}
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={(dataUser.email)}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm. email:
          <input
            type="text"
            name="confirmEmail"
            value={(confirmData.confirmEmail)}
            onChange={handleChangeConfirm}
          />
        </label>
        <label>
          Senha:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={(dataUser.password)}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm. senha:
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={(confirmData.confirmPassword)}
            onChange={handleChangeConfirm}
          />
        </label>
          <label>
            <div>
              <input
                type="checkbox"
                value={showPassword}
                onClick={handleShowPasswordToggle}
                />
              Mostrar senha
              </div>
          </label>
        <div>
          <p className={stateData?.password?.minSixCaracteres ? "validade-password-ok" : "validade-password-not"}>
            Mínimo 6 caracteres
          </p>
          <p className={stateData?.password?.minUpperCase ? "validade-password-ok" : "validade-password-not"}>
            Mínimo uma letra maiúscula
          </p>
          <p className={stateData?.password?.minLowerCase ? "validade-password-ok" : "validade-password-not"}>
            Mínimo uma letra minuscula
          </p>
          <p className={stateData?.password?.minNumber ? "validade-password-ok" : "validade-password-not"}>
            Mínimo um numero
          </p>
          <p className={stateData?.password?.minEspecialCaracter ? "validade-password-ok" : "validade-password-not"}>
            Mínimo um caractere especial
          </p>
        </div>
        <div>
          {
            !activateData.email
            && <p className="validade-password-not">
              Os emails devem ser iguais
            </p>
          }
          {
            !activateData.password
            && <p className="validade-password-not">
              As senhas devem ser iguais
            </p>
          }
        </div>
        <div className="container-btn-register">
          <button type="btn" onClick={handleGoBack}>Voltar</button>
          <button
            type="btn"
            onClick={handleRegister}
            disabled={!stateData?.activateRegister}
          >
          Cadastrar
          </button>
        </div>
      </div>
      <div>
        teste<br/>
        empteste<br/>
        admin<br/>
        teste@teste.com<br/>
        Teste1!<br/>
        12121212121<br/>
        </div>
    </div>
  )
}

export default Register
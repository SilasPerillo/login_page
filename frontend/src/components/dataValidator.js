function dataValidator(data) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let dataState = {
    user: false,
    email: false,
    id_cpf: false,
    activateRegister: false,
    password: {
      minSixCaracteres: false,
      minUpperCase: false,
      minLowerCase: false,
      minNumber: false,
      minEspecialCaracter: false,
    },
  };

  // valida se o usuário possui 6 ou mais caracteres
  if (data.user.length >= 5) {
    dataState = {
      ...dataState,
      user: true,
    };
  }

  if (data.id_cpf.length > 10) {
    dataState = {
      ...dataState,
      id_cpf: true,
    };
  }

  // valida se é um email valido
  if (emailRegex.test(data.email)) {
    dataState = {
      ...dataState,
      email: true,
    };
  }

  // valida o comprimento da senha
  if (data.password.length >= 6) {
    dataState = {
      ...dataState,
      password: {
        ...dataState.password,
        minSixCaracteres: true,
      },
    };
  }

  if (data.password.match(/[A-Z]/)) {
    dataState = {
      ...dataState,
      password: {
        ...dataState.password,
        minUpperCase: true,
      },
    };
  }

  if (data.password.match(/[a-z]/)) {
    dataState = {
      ...dataState,
      password: {
        ...dataState.password,
        minLowerCase: true,
      },
    };
  }

  if (data.password.match(/[0-9]/)) {
    dataState = {
      ...dataState,
      password: {
        ...dataState.password,
        minNumber: true,
      },
    };
  }

  // eslint-disable-next-line no-useless-escape
  const regexCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  if (data.password.match(regexCaracterEspecial)) {
    dataState = {
      ...dataState,
      password: {
        ...dataState.password,
        minEspecialCaracter: true,
      },
    };
  }

  if (
    dataState.user &&
    dataState.email &&
    dataState.id_cpf &&
    dataState.password.minSixCaracteres &&
    dataState.password.minUpperCase &&
    dataState.password.minLowerCase &&
    dataState.password.minNumber &&
    dataState.password.minEspecialCaracter
  ) {
    dataState = {
      ...dataState,
      activateRegister: true,
    };
  }
  return dataState;
}

export default dataValidator;

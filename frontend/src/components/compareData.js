function compareData(dataUser, confirmData) {
  let activateData = {
    activate: false,
    email: false,
    password: false,
  };

  if (dataUser.email === confirmData.confirmEmail) {
    activateData = {
      ...activateData,
      email: true,
    };
  }

  if (dataUser.password === confirmData.confirmPassword) {
    activateData = {
      ...activateData,
      password: true,
    };
  }

  if (activateData.email && activateData.password) {
    activateData = {
      ...activateData,
      activate: true,
    };
  }

  return activateData;
}

export default compareData;

const usersArr = [];

const createUserUseCase = (payload) => {
  const { name, email, password } = payload;
  const newUser = {
    id: usersArr.length + 1,
    name,
    email,
    password,
    createdDate: new Date(),
  }

  usersArr = [...usersArr, newUser];
  return newUser;
}

export { usersArr, createUserUseCase }
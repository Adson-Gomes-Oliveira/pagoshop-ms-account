const usersArr = [
  {
    id: 1,
    name: "Uchiha Sasuke",
    email: "sharingansemfronteiras@gmail.com",
    password: "narutoeumbabaca4566",
    createdDate: new Date("2023-01-02T13:56:21.510Z")
  },
];

const createUserUseCase = (payload) => {
  const { name, email, password } = payload;
  const newUser = {
    id: usersArr.length + 1,
    name,
    email,
    password,
    createdDate: new Date(),
  }

  usersArr.push(newUser);
  return newUser;
}

export default createUserUseCase;
export { usersArr }

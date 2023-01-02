import { usersArr } from './createUserAccount.js';

const changeUserNameUseCase = (email, newName) => {
  const userByEmail = usersArr.find((user) => user.email === email);
  if (!userByEmail) return false;

  const userIndex = usersArr.findIndex((user) => user.email === email);

  usersArr[userIndex].name = newName;
  return true;
}

export default changeUserNameUseCase;

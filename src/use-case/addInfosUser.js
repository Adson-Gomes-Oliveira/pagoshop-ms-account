import { usersArr } from './createUserAccount.js';

const addInfosUserUseCase = (payload, email) => {
  const userIndex = usersArr.findIndex((user) => user.email === email);
  if (userIndex === -1) return false;

  const keysToAdd = Object.keys(payload);
  keysToAdd.forEach((key) => usersArr[userIndex][key] = payload[key]);

  return usersArr[userIndex];
}

export default addInfosUserUseCase;

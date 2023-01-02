import { usersArr } from './createUserAccount.js';

const searchUserAccountByEmailUseCase = (email) => {
  const userByEmail = usersArr.find((user) => user.email === email);
  if (!userByEmail) return false;

  return userByEmail;
}

export default searchUserAccountByEmailUseCase;

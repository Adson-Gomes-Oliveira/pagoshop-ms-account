import { usersArr } from './createUserAccount.js';
import searchUserAccountByEmailUseCase from './searchUserAccountByEmail.js';

const removeUserUseCase = (email) => {
  const userByEmailIndex = usersArr.findIndex((user) => user.email === email);
  if (userByEmailIndex === -1) return false;

  usersArr.splice(userByEmailIndex, 1)
  
  const userKeepStored = searchUserAccountByEmailUseCase(email);
  if(userKeepStored) return false;

  return true;
}

export default removeUserUseCase;
export { usersArr }

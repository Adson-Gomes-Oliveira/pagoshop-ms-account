import { usersArr } from './createUserAccount.js';

const searchUsersByStateUseCase = (state) => {
  const sameStateUsers = usersArr.filter((user) => user.state === state);
  return sameStateUsers;
}

export default searchUsersByStateUseCase;

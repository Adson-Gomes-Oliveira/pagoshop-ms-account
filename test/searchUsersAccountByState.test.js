import createUserUseCase, { usersArr } from '../src/use-case/createUserAccount.js';
import addInfosUserUseCase from '../src/use-case/addInfosUser.js';
import searchUsersByStateUseCase from '../src/use-case/searchUsersAccountByState.js';

const mockUserPayloads = [
  {
    name: "Adson Gomes Oliveira",
    email: "adson.oliveira@pagonxt",
    password: "legendsneverdie2500",
  },
  {
    name: "Haruno Sakura",
    email: "sakura.oliveira@pagonxt",
    password: "lege456",
  }
]

const mockInfospayloads = [
  {
    publicPlace: "Bateias",
    number: 468,
    aditionalInfos: "",
    district: "Brasil",
    postalCOde: 19956336,
    city: "Vitória da Conquista",
    state: "BA"
  },
  {
    publicPlace: "",
    number: 0,
    aditionalInfos: "",
    district: "",
    postalCOde: 0,
    city: "",
    state: "BA"
  },
  {
    publicPlace: "",
    number: 0,
    aditionalInfos: "",
    district: "",
    postalCOde: 0,
    city: "",
    state: "SP"
  },
]

createUserUseCase(mockUserPayloads[0]);
createUserUseCase(mockUserPayloads[1]);
addInfosUserUseCase(mockInfospayloads[0], "sharingansemfronteiras@gmail.com");
addInfosUserUseCase(mockInfospayloads[1], mockUserPayloads[0].email);
addInfosUserUseCase(mockInfospayloads[2], mockUserPayloads[1].email);

console.log(searchUsersByStateUseCase('BA'));

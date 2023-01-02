import addInfosUserUseCase from '../src/use-case/addInfosUser.js';

const mock_payload = {
  publicPlace: "Bateias",
  number: 468,
  aditionalInfos: "",
  district: "Brasil",
  postalCOde: 19956336,
  city: "Vitória da Conquista",
  state: "Bahia"
}

console.log(addInfosUserUseCase(mock_payload, "sharingansemfronteiras@gmail.com"));
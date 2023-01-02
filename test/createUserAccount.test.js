import createUserUseCase from "../src/use-case/createUserAccount.js";

const mockUserPayload = {
  name: "Adson Gomes Oliveira",
  email: "adson.oliveira@pagonxt",
  password: "legendsneverdie2500",
}

console.log(createUserUseCase(mockUserPayload));

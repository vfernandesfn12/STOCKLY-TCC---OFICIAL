import { useContext } from "react";
import { AuthContext } from "../contexts/UserContext.jsx";

export function useVerificaLogin() {
  const { login } = useContext(AuthContext);

  const verificaLogin = (data) => {
    // ✅ USUÁRIO FIXO NO SISTEMA
    const usuarioPadrao = {
      id: 1,
      nome: "Admin",
      email: "admin@gmail.com",
      senha: "123",
      imagemUrl: ""
    };

    if (
      data.email === usuarioPadrao.email &&
      data.senha === usuarioPadrao.senha
    ) {
      login(usuarioPadrao);
      return "Login efetuado com sucesso";
    } else {
      return "Usuário ou senha inválidos";
    }
  };

  return { verificaLogin };
}

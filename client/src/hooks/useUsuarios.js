import { useContext } from "react";
import { AuthContext } from "../contexts/UserContext.jsx";

export function useVerificaLogin() {
  const { login } = useContext(AuthContext);

  // faz a busca tanto em /usuarios quanto em /funcionarios
  const buscaUsuarios = async () => {
    try {
      const [resUsuarios, resFuncionarios] = await Promise.all([
        fetch("http://localhost:5000/usuarios"),
        fetch("http://localhost:5000/funcionarios"),
      ]);

      const usuarios = resUsuarios.ok ? await resUsuarios.json() : [];
      const funcionarios = resFuncionarios.ok ? await resFuncionarios.json() : [];

      return { usuarios, funcionarios };
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return { usuarios: [], funcionarios: [] };
    }
  };

  const verificaLogin = async (data) => {
    const { email, senha } = data;

    const { usuarios, funcionarios } = await buscaUsuarios();

    // procura primeiro em usuarios
    const usuarioEncontrado = (usuarios || []).find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      const usuario = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome || usuarioEncontrado.nome_funcionario || "Usuário",
        email: usuarioEncontrado.email,
        imagemUrl: usuarioEncontrado.imagemUrl || usuarioEncontrado.fotoUrl || "",
      };
      login(usuario);
      return "Login efetuado com sucesso";
    }

    // procura em funcionarios
    const funcionarioEncontrado = (funcionarios || []).find(
      (f) => f.email === email && f.senha === senha
    );

    if (funcionarioEncontrado) {
      const usuario = {
        id: funcionarioEncontrado.id,
        nome: funcionarioEncontrado.nome || funcionarioEncontrado.nome_funcionario || "Funcionário",
        email: funcionarioEncontrado.email,
        imagemUrl: funcionarioEncontrado.imagemUrl || funcionarioEncontrado.fotoUrl || "",
      };
      login(usuario);
      return "Login efetuado com sucesso";
    }

    return "Usuário ou senha inválidos";
  };

  return { verificaLogin };
}

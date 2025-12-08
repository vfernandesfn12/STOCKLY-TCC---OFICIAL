import { createContext, useState, useEffect } from "react";

export const MovimentacoesContext = createContext();

export function MovimentacoesProvider({ children }) {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("movimentacoes")) || [];
    setMovimentacoes(dados);
  }, []);

  function adicionarMovimentacao(nova) {
    const atualizadas = [...movimentacoes, nova];
    setMovimentacoes(atualizadas);
    localStorage.setItem("movimentacoes", JSON.stringify(atualizadas));
  }

  function limparMovimentacoes() {
    setMovimentacoes([]);
    localStorage.removeItem("movimentacoes");
  }

  return (
    <MovimentacoesContext.Provider
      value={{
        movimentacoes,
        adicionarMovimentacao,
        limparMovimentacoes,
      }}
    >
      {children}
    </MovimentacoesContext.Provider>
  );
}

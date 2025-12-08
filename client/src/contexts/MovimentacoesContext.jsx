import { createContext, useState, useEffect } from "react";

export const MovimentacoesContext = createContext();

export const MovimentacoesProvider = ({ children }) => {
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Carrega dados: primeiro mov, se não existir tenta backup
  const fetchMovimentacoes = () => {
    const dados =
      JSON.parse(localStorage.getItem("movimentacoes")) ||
      JSON.parse(localStorage.getItem("movimentacoes_backup")) ||
      [];
    setMovimentacoes(dados);
    // garante que mov esteja presente (útil após restaurar do backup)
    localStorage.setItem("movimentacoes", JSON.stringify(dados));
  };

  // Adiciona uma movimentação (entrada/saída)
  const adicionarMovimentacao = (nova) => {
    // manter ordem: nova aparece primeiro
    const atualizadas = [nova, ...movimentacoes];
    setMovimentacoes(atualizadas);
    localStorage.setItem("movimentacoes", JSON.stringify(atualizadas));
  };

  // Limpa guardando backup
  const limparMovimentacoes = () => {
    const backup = JSON.parse(localStorage.getItem("movimentacoes")) || [];
    localStorage.setItem("movimentacoes_backup", JSON.stringify(backup));
    localStorage.removeItem("movimentacoes");
    setMovimentacoes([]);
  };

  // Restaura backup (pode chamar fetchMovimentacoes)
  const restaurarBackup = () => {
    const backup = JSON.parse(localStorage.getItem("movimentacoes_backup")) || [];
    setMovimentacoes(backup);
    localStorage.setItem("movimentacoes", JSON.stringify(backup));
  };

  useEffect(() => {
    fetchMovimentacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MovimentacoesContext.Provider
      value={{
        movimentacoes,
        fetchMovimentacoes,
        adicionarMovimentacao,
        limparMovimentacoes,
        restaurarBackup,
      }}
    >
      {children}
    </MovimentacoesContext.Provider>
  );
};

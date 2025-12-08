import { useContext } from "react";
import { MovimentacoesContext } from "../contexts/MovimentacoesContext";

export function useMovimentacoes() {
  const { movimentacoes } = useContext(MovimentacoesContext);
  return movimentacoes;
}

export function useMovimentacoesRecarga() {
  const { adicionarMovimentacao, fetchMovimentacoes, limparMovimentacoes, restaurarBackup } =
    useContext(MovimentacoesContext);

  return {
    adicionarMovimentacao,
    fetchMovimentacoes,
    limparMovimentacoes,
    restaurarBackup,
  };
}

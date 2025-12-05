const url = import.meta.env.VITE_API_URL;

import { useState, useEffect } from "react";

export function useMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`${url}/movimentacoes`);
        const res = await req.json();
        setMovimentacoes(res);
      } catch (error) {
        console.log("Erro ao carregar movimentações:", error.message);
      }
    }
    fetchData();
  }, []);

  return movimentacoes;
}

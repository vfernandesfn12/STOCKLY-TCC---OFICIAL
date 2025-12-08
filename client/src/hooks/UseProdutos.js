// url da API
const url = import.meta.env.VITE_API_URL;

//Importando o hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

// CRUD PRODUTOS

// C
export function useInserirProduto() {
  // Recebe os dados do produto vindo do formulário, faz uma requisição para a API, para inserção do produto utilizando o método POST
  const inserirProduto = async (data) => {
    const req = await fetch(`${url}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Produto inserido:", res);

    // Retorna o produto inserido
    return res;
  };

  return { inserirProduto };
}

// R
export function useListaProdutos() {
  //Lista de produtos
  const [produtos, setProdutos] = useState([]);
  // UseEffect pra puxar os dados da API assim que o componente é renderizado
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`${url}/produtos`);
        const res = await req.json();
        setProdutos(res);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de produtos
  return produtos;
}

// D - Deletar
export function useRemoverQuantidadeProduto() {
  const removerQuantidade = async (produto, quantidadeRemover) => {
    const novaQuantidade =
      Number(produto.quantidade) - Number(quantidadeRemover);

    // CASO ZERE O ESTOQUE → REMOVE O PRODUTO COMPLETAMENTE
    if (novaQuantidade <= 0) {
      const req = await fetch(
        `${url}/produtos/${produto.id}`,
        {
          method: "DELETE",
        }
      );
      const res = await req.json();
      return { removido: true, produto: res };
    }

    // CASO AINDA TENHA ESTOQUE → APENAS ATUALIZA
    const dadosAtualizados = {
      ...produto,
      quantidade: novaQuantidade,
    };

    const req = await fetch(
      `${url}/produtos/${produto.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      }
    );

    const res = await req.json();
    return { removido: false, produto: res };
  };

  return { removerQuantidade };
}

// Cria o hook para bucar um produto por id
export function useBuscarProdutoPorId() {
  // Receb o id do produto e faz a requisição para a api
  // com o método GET
  const buscarProdutoPorId = async (idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`);
    const res = await req.json();
    console.log("Produto encontrado:", res);
    return res;
  };
  return { buscarProdutoPorId };
}

// Hook para atualizar um produto
export function useAtualizarProduto() {
  // Envia os dados novos, para o produto específico
  const atualizarProduto = async (data, idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    return res;
  };
  return { atualizarProduto };
}

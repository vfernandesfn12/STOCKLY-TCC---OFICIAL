// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Cria o hook para listar os Clientes, puxando os dados da api
export function useListaClientes() {
  //Lista com Clientes
  const [clientes, setClientes] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/clientes`);
        const clientes = await req.json();
        console.log(clientes);
        setClientes(clientes);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de Clientes
  return clientes;
}

// Cria o hook para excluir um Clientes
export function useDeletaClientes() {
  // Recebe o id do Clientes a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarCliente = async (idCliente) => {
    // mudei aqui
    const req = await fetch(`${url}/clientes/${idCliente}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o Clientes deletado
    return res;
  };
  return { deletarCliente };
}

// Cria o hook para inserir um Clientes
export function useInserirCliente() {
  // Recebe os dados do Clientes e faz a requisição para a API
  // com o método POST
  const inserirCliente = async (data) => {
    const req = await fetch(`${url}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Cliente inserido:", res);
    // Retorna o Clientes inserido
    return res;
  };

  return { inserirCliente };
}

// Cria o hook para bucar um Clientes por id
export function useBuscarClientePorId() {
  // Receb o id do Clientes e faz a requisição para a api
  // com o método GET
  const buscarClientePorId = async (idCliente) => {
    const req = await fetch(`${url}/clientes/${idCliente}`);
    const res = await req.json();
    console.log("Cliente encontrado:", res);
    return res;
  };
  return { buscarClientePorId };
}

// Cria o hook para atualizar um Clientes
export function useAtualizaCliente() {
  // Envia os dados do Clientes recebido via data, para o Clientes específico que recebeu via id Clientes,
  // e faz a requisição para a ai, com o método PUT
  const atualizaCliente = async (data, idCliente) => {
    const req = await fetch(`${url}/clientes/${idCliente}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Cliente atualizado:", res);
    // Retorna o Clientes atualizado
    return res;
  };
  return { atualizaCliente };
}
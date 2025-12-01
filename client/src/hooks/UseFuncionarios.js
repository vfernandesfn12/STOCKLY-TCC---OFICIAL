// url da API
const url = "http://localhost:5000";

import { useState, useEffect } from "react";

// Lista de departamentos
export function useListaDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        const req = await fetch(`${url}/departamentos`);
        const res = await req.json();
        setDepartamentos(res);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchDepartamentos();
  }, []);

  return departamentos;
}

// Lista de funcionários
export function useListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const req = await fetch(`${url}/funcionarios`);
        const res = await req.json();
        setFuncionarios(res);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchFuncionarios();
  }, []);

  return funcionarios;
}

// Inserir funcionário
export function useInserirFuncionario() {
  const inserirFuncionario = async (data) => {
    try {
      const req = await fetch(`${url}/funcionarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await req.json();
      console.log("Funcionário inserido:", res);
      return res;
    } catch (erro) {
      console.log("Erro ao inserir funcionário:", erro.message);
    }
  };

  return { inserirFuncionario };
}

// Deletar funcionário
export function useDeletaFuncionario() {
  const deletarFuncionario = async (idFuncionario) => {
    try {
      const req = await fetch(`${url}/funcionarios/${idFuncionario}`, {
        method: "DELETE",
      });
      const res = await req.json();
      console.log("Funcionário deletado:", res);
      return res;
    } catch (erro) {
      console.log("Erro ao deletar funcionário:", erro.message);
    }
  };

  return { deletarFuncionario };
}

// Buscar funcionário por ID
export function useBuscarFuncionarioPorId() {
  const buscarFuncionarioPorId = async (idFuncionario) => {
    try {
      const req = await fetch(`${url}/funcionarios/${idFuncionario}`);
      const res = await req.json();
      console.log("Funcionário encontrado:", res);
      return res;
    } catch (erro) {
      console.log("Erro ao buscar funcionário:", erro.message);
    }
  };

  return { buscarFuncionarioPorId };
}

// Atualizar funcionário
export function useAtualizarFuncionario() {
  const atualizarFuncionario = async (data, idFuncionario) => {
    try {
      const req = await fetch(`${url}/funcionarios/${idFuncionario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      console.log("Funcionário atualizado:", res);
      return res;
    } catch (erro) {
      console.log("Erro ao atualizar funcionário:", erro.message);
    }
  };

  return { atualizarFuncionario };
}

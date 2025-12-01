import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsSearch } from "react-icons/bs";

import styles from "./VerProdutos.module.css";

import { useListaProdutos, useDeletaProduto } from "../../hooks/UseProdutos";

const VerProdutos = () => {
  const produtos = useListaProdutos();
  const { deletarProduto } = useDeletaProduto();

  // Busca por nome
  const [buscaNome, setBuscaNome] = useState("");

  const produtosFiltrados = buscaNome
    ? produtos.filter(
        (pro) =>
          pro.nome && pro.nome.toLowerCase().includes(buscaNome.toLowerCase())
      )
    : produtos;

  const handleDelete = async (id, nome) => {
    if (confirm(`Deseja realmente excluir o produto ${nome}?`)) {
      await deletarProduto(id);
      alert(`Produto ${nome} deletado com sucesso!`);
      window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        {/* HEADER IGUAL AO DE CLIENTES */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Estoque de Produtos</h1>
          <p className={styles.subtitulo}>Gerencie seus produtos cadastrados</p>
        </div>

        {/* FILTRO: Busca por nome */}
        <div className={styles.filtroContainer}>
          <p className={styles.filtroTitle}>🔍 Consulta por nome:</p>

          <div className={styles.filtroContent}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Digite o nome do produto"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
              />
            </div>

            <button
              className={styles.btnPesquisar}
              onClick={() => {
                // o filtro já é aplicado em produtosFiltrados por buscaNome;
                // este botão serve para melhorar UX (poderia disparar validações futuramente)
              }}
            >
              <BsSearch /> Pesquisar
            </button>
          </div>
        </div>

        {/* TABELA IGUAL AO VERCLIENTES */}
        <div className={styles.tableContainer}>
          <table className={`table ${styles.table}`}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Entrada</th>
                <th>Validade</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((pro) => (
                  <tr key={pro.id}>
                    <td>{pro.nome}</td>
                    <td>{pro.codigo}</td>
                    <td>{pro.descricao}</td>
                    <td>{pro.dataEntrada}</td>
                    <td>{pro.dataValidade}</td>
                    <td>{pro.valor}</td>

                    <td>
                      <div className={styles.acoesBotoes}>

                        <button className={styles.btnEditar}>
                          <Link
                            to={`/produtos/editar/${pro.id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            Editar
                          </Link>
                        </button>

                        <button
                          className={styles.btnExcluir}
                          onClick={() => handleDelete(pro.id, pro.nome)}
                        >
                          Excluir
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.mensagemVazia}>
                    Nenhum produto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default VerProdutos;

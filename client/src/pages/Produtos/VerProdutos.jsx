import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import styles from "./VerProdutos.module.css";

import { useListaProdutos, useRemoverQuantidadeProduto } from "../../hooks/UseProdutos";
import { useMovimentacoesRecarga } from "../../hooks/useMovimentacoes";

const VerProdutos = () => {
  const produtos = useListaProdutos();
  const { removerQuantidade } = useRemoverQuantidadeProduto();
  const { adicionarMovimentacao } = useMovimentacoesRecarga();

  // Busca por nome
  const [buscaNome, setBuscaNome] = useState("");

  const produtosFiltrados = buscaNome
    ? produtos.filter(
      (pro) =>
        pro.nome && pro.nome.toLowerCase().includes(buscaNome.toLowerCase())
    )
    : produtos;

  //  AGORA REGISTRA A SAÍDA NO RELATÓRIO
  const handleRemover = async (produto) => {
    const quantidade = Number(
      prompt(
        `Quantas unidades deseja remover de "${produto.nome}"?\n\nEstoque atual: ${produto.quantidade}`
      )
    );

    if (!quantidade || quantidade <= 0) {
      return alert("Quantidade inválida.");
    }

    if (quantidade > produto.quantidade) {
      return alert("Quantidade maior que o estoque disponível.");
    }

    try {
      const resultado = await removerQuantidade(produto, quantidade);

      adicionarMovimentacao({
        tipo: "Saída",
        produto: produto.nome,
        quantidade: quantidade,
        data: new Date().toLocaleString(),
      });

      //  MENSAGEM DIFERENTE SE ZERAR O ESTOQUE
      if (resultado.removido) {
        alert(` Produto "${produto.nome}" removido do estoque!`);
      } else {
        alert(` ${quantidade} unidades removidas com sucesso!`);
      }

      window.location.reload(); // Atualiza a página

    } catch (erro) {
      alert("Erro ao remover produto.");
      console.error(erro);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>

        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Estoque de Produtos</h1>
          <p className={styles.subtitulo}>Gerencie seus produtos cadastrados</p>
        </div>

        {/* FILTRO */}
        <div className={styles.filtroContainer}>
          <p className={styles.filtroTitle}> Consulta por nome:</p>

          <div className={styles.filtroContent}>
            <div className={styles.inputGroup}>
              <input
                style={{ width: "300px" }}
                type="text"
                placeholder="Digite o nome do produto"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
              />
            </div>

            <button className={styles.btnPesquisar}>
              <BsSearch /> Pesquisar
            </button>
          </div>
        </div>

        {/* TABELA */}
        <div className={styles.tableContainer}>
          <table className={`table ${styles.table}`}>
            <thead>
              <tr>
                <th><strong>Nome</strong></th>
                <th><strong>Código</strong></th>
                <th><strong>Descrição</strong></th>
                <th><strong>Quantidade</strong></th>
                <th><strong>Fornecedor</strong></th>
                <th><strong>Tipo</strong></th>
                <th><strong>Entrada</strong></th>
                <th><strong>Validade</strong></th>
                <th><strong>Valor</strong></th>
                <th><strong>Ações</strong></th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((pro) => (
                  <tr key={pro.id}>
                    <td>{pro.nome}</td>
                    <td>{pro.codigo}</td>
                    <td>{pro.descricao}</td>
                    <td>{pro.quantidade}</td>
                    <td>{pro.fornecedor}</td>
                    <td>{pro.tipoProduto}</td>
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

                        {/* ✅ AGORA PASSAMOS O PRODUTO INTEIRO */}
                        <button
                          className={styles.btnExcluir}
                          onClick={() => handleRemover(pro)}
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={styles.mensagemVazia}>
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

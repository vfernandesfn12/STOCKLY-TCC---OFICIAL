// VerClientes.jsx
import React, { useState, useRef, useEffect } from "react";

// Importando componentes do bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Importando ícones
import { BsSearch, BsBox } from "react-icons/bs";

// Importando o hook dos clientes
import { useListaClientes, useDeletaClientes } from "../../hooks/useClientes";

// Importando o link para ir pra outra página
import { Link } from "react-router-dom";

// Importando o módulo CSS
import styles from "./VerClientes.module.css";

// Portal utilitário
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const VerClientes = () => {
  // Variavel para armazenar a lista de clientes
  const clientes = useListaClientes();

  // importando a função de deletar cliente
  const { deletarCliente } = useDeletaClientes();

  // Funçao para requisitar a exclusao do cliente
  const handleDelete = async (idCliente, nome) => {
    // Após confirmação, utiliza-se o hook de deletar para solicitar a exclusão
    // passando o id do cliente
    if (confirm(`Deseja realmente excluir o cliente ${nome}?`)) {
      const deletado = await deletarCliente(idCliente);
      alert(`Cliente ${nome} deletado com sucesso!`);
      window.location.reload();
    }
  };

  // PARTE DE FILTROS
  // Variaveis para os filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  // refs e estado de posição para o portal dropdown
  const botaoRef = useRef(null);
  const menuRef = useRef(null);
  const [posicao, setPosicao] = useState({ top: 0, left: 0, width: 0 });

  // calcula e ajusta posição do menu com base no botão
  const atualizaPosicao = () => {
    if (!botaoRef.current) return;
    const rect = botaoRef.current.getBoundingClientRect();
    // queremos que o menu alinhe à esquerda do botão e apareça abaixo
    setPosicao({
      top: rect.bottom + window.scrollY + 6, // desloca um pouco para baixo
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  // atualiza posição quando abrir, e quando o tamanho da janela/scroll mudar
  useEffect(() => {
    if (dropdownAberto) {
      atualizaPosicao();
      window.addEventListener("resize", atualizaPosicao);
      window.addEventListener("scroll", atualizaPosicao, true);
      return () => {
        window.removeEventListener("resize", atualizaPosicao);
        window.removeEventListener("scroll", atualizaPosicao, true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownAberto]);

  // fecha ao clicar fora ou ao apertar Esc
  useEffect(() => {
    if (!dropdownAberto) return;

    const handleClickOutside = (e) => {
      // se clicar no botão, ignora
      if (botaoRef.current && botaoRef.current.contains(e.target)) return;
      // se menu existe e o click estiver fora, fecha
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownAberto(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setDropdownAberto(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [dropdownAberto]);

  // Lógica do filtro
  const clientesFiltrados = clientes.filter((cli) => {
    // Verifica se o que está na caixinha, tem semelhança com algum nome de cliente
    const nomeCorresponde = cli.nome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    // Verifica se o que está no filtro do dropdown, tem semelhança com algum tipo de cliente
    const tipoCorresponde = buscaTipo
      ? cli.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Fornecedores Cadastrados</h1>
          <p className={styles.subtitulo}>
            Gerencie todos os seus fornecedores cadastrados
          </p>
        </div>

        {/* FILTROS */}
        <div className={styles.filtroContainer}>
          <p className={styles.filtroTitle}> Filtros:</p>
          <div className={styles.filtroContent}>
            <InputGroup className={styles.inputGroup}>
              <Form.Control
                placeholder="Procure um fornecedor por nome"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                className={styles.filtroInput}
              />
              <Button className={styles.btnPesquisar} id="botao-filtrar" style={{ marginLeft: "20px" }}>
                <BsSearch /> Pesquisar
              </Button>
            </InputGroup>

            {/* DROPDOWN: botão permanece aqui, menu é renderizado via Portal */}
            <div className={styles.dropdownCustom}>
              <button
                ref={botaoRef}
                className={styles.dropdownBotao}
                onClick={() => {
                  setDropdownAberto((s) => !s);
                }}
                type="button"
              >
                {buscaTipo ? buscaTipo : "Todas as categorias"}
                <span className={styles.dropdownArrow}>▼</span>
              </button>

              {dropdownAberto && (
                <Portal>
                  <div
                    ref={menuRef}
                    className={styles.dropdownMenuCustom}
                    style={{
                      position: "absolute",
                      top: posicao.top,
                      left: posicao.left,
                      zIndex: 999999,
                      // opcional: faz o menu ter largura igual ao botão
                      minWidth: Math.max(200, posicao.width || 200),
                    }}
                  >
                    <button
                      className={styles.dropdownItemCustom}
                      onClick={() => {
                        setBuscaTipo("");
                        setDropdownAberto(false);
                      }}
                      type="button"
                    >
                      ✓ Todas
                    </button>

                    <button
                      className={styles.dropdownItemCustom}
                      onClick={() => {
                        setBuscaTipo("Alimentos");
                        setDropdownAberto(false);
                      }}
                      type="button"
                    >
                       Alimentos
                    </button>

                    <button
                      className={styles.dropdownItemCustom}
                      onClick={() => {
                        setBuscaTipo("Bebidas");
                        setDropdownAberto(false);
                      }}
                      type="button"
                    >
                       Bebidas
                    </button>

                    <button
                      className={styles.dropdownItemCustom}
                      onClick={() => {
                        setBuscaTipo("Congelados");
                        setDropdownAberto(false);
                      }}
                      type="button"
                    >
                       Congelados
                    </button>

                    <button
                      className={styles.dropdownItemCustom}
                      onClick={() => {
                        setBuscaTipo("Outros");
                        setDropdownAberto(false);
                      }}
                      type="button"
                    >
                       Outros
                    </button>
                  </div>
                </Portal>
              )}
            </div>
          </div>
        </div>

        {/* TABELA */}
        <div className={styles.tableContainer}>
          {clientesFiltrados.length > 0 ? (
            <Table hover className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empresa</th>
                  <th>Email</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((cli) => (
                  <tr key={cli.id}>
                    <td>{cli.id}</td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{cli.nome}</span>
                    </td>
                    <td>{cli.email}</td>
                    <td>{cli.documento}</td>
                    <td>
                      <span
                        style={{
                          background:
                            cli.tipo === "PF"
                              ? "rgba(74, 144, 226, 0.2)"
                              : "rgba(76, 175, 80, 0.2)",
                          color: cli.tipo === "PF" ? "#4a90e2" : "#4caf50",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                        }}
                      >
                        {cli.tipo}
                      </span>
                    </td>
                    <td>{cli.telefone}</td>
                    <td>{cli.endereco.cidade}</td>
                    <td>
                      <span
                        style={{
                          background:
                            cli.status === "Ativo"
                              ? "rgba(76, 175, 80, 0.2)"
                              : "rgba(244, 67, 54, 0.2)",
                          color: cli.status === "Ativo" ? "#4caf50" : "#f44336",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                        }}
                      >
                        {cli.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.acoesBotoes}>
                        <Button
                          as={Link}
                          to={`/clientes/editar/${cli.id}`}
                          size="sm"
                          className={styles.btnEditar}
                        >
                           Editar
                        </Button>
                        <Button
                          size="sm"
                          className={styles.btnExcluir}
                          onClick={() => handleDelete(cli.id, cli.nome)}
                        >
                           Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className={styles.mensagemVazia}>
              <div className={styles.iconeVazio}>
                <BsBox />
              </div>
              <p>Nenhum cliente encontrado</p>
              <small>
                Tente ajustar seus filtros ou cadastre um novo cliente
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerClientes;

// VerFuncionarios.jsx
import { useState, useRef, useEffect } from "react";

// Importando componentes do bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Importando ícones
import { BsSearch, BsBox } from "react-icons/bs";

// Importando o hook dos funcionários
import { useListaFuncionarios, useDeletaFuncionario } from "../../hooks/UseFuncionarios";

// Importando o link para ir pra outra página
import { Link } from "react-router-dom";

// Importando o módulo CSS
import styles from "./VerFuncionarios.module.css";

// Portal utilitário
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const VerFuncionarios = () => {
  // Lista de funcionários
  const funcionarios = useListaFuncionarios();

  // Função de deletar funcionário
  const { deletarFuncionario } = useDeletaFuncionario();

  // Função para exclusão
  const handleDelete = async (idFuncionario, nome) => {
    if (window.confirm(`Deseja realmente excluir o funcionário ${nome}?`)) {
      await deletarFuncionario(idFuncionario);
      alert(`Funcionário ${nome} deletado com sucesso!`);
      window.location.reload();
    }
  };

  // FILTROS
  const [buscaNome, setBuscaNome] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const botaoRef = useRef(null);
  const menuRef = useRef(null);
  const [setPosicao] = useState({ top: 0, left: 0, width: 0 });

  const atualizaPosicao = () => {
    if (!botaoRef.current) return;
    const rect = botaoRef.current.getBoundingClientRect();
    setPosicao({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

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
  }, [dropdownAberto]);

  useEffect(() => {
    if (!dropdownAberto) return;

    const handleClickOutside = (e) => {
      if (botaoRef.current && botaoRef.current.contains(e.target)) return;
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

  // FILTRO FINAL
  const funcionariosFiltrados = funcionarios.filter((func) =>
    func.nome_funcionario.toLowerCase().includes(buscaNome.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Funcionários Cadastrados</h1>
          <p className={styles.subtitulo}>
            Gerencie todos os seus funcionários cadastrados.
          </p>
        </div>

        {/* FILTRO */}
        <div className={styles.filtroContainer}>
          <p className={styles.filtroTitle}>Filtros</p>
          <div className={styles.filtroContent}>
            <InputGroup className={styles.inputGroup}>
              <Form.Control
                placeholder="Procure um funcionário por nome"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                className={styles.filtroInput}
              />
              <Button
                className={styles.btnPesquisar}
                style={{ marginLeft: "20px" }}
              >
                <BsSearch /> Pesquisar
              </Button>
            </InputGroup>
          </div>
        </div>

        {/* TABELA */}
        <div className={styles.tableContainer}>
          {funcionariosFiltrados.length > 0 ? (
            <Table hover className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Departamento</th>
                  <th>Cargo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionariosFiltrados.map((func) => (
                  <tr key={func.id}>
                    <td>{func.id}</td>
                    <td style={{ fontWeight: 500 }}>{func.nome_funcionario}</td>
                    <td>{func.email}</td>
                    <td>{func.cpf}</td>
                    <td>{func.telefone}</td>
                    <td>{func.departamento}</td>
                    <td>{func.cargo || "N/A"}</td>
                    <td>
                      <div className={styles.acoesBotoes}>
                        <Button
                          as={Link}
                          to={`/funcionarios/editar/${func.id}`}
                          size="sm"
                          className={styles.btnEditar}
                        >
                          Editar
                        </Button>

                        <Button
                          size="sm"
                          className={styles.btnExcluir}
                          onClick={() =>
                            handleDelete(func.id, func.nome_funcionario)
                          }
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
              <p>Nenhum funcionário encontrado</p>
              <small>
                Tente ajustar seus filtros ou cadastre um novo funcionário
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerFuncionarios;
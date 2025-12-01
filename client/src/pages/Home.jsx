import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BsPeople, BsBoxSeam, BsPersonLinesFill, BsBuilding, BsExclamationTriangle } from "react-icons/bs";

import { useListaClientes } from "./Clientes/../../hooks/useClientes";
import { useListaProdutos } from "../hooks/UseProdutos";
import styles from "./Home.module.css";

export default function Home() {
  const clientes = useListaClientes();
  const produtos = useListaProdutos();

  const [produtosCount, setProdutosCount] = useState(0);
  const [funcionariosCount, setFuncionariosCount] = useState(0);

  useEffect(() => {
    // buscar quantidade de produtos e funcionários diretamente da API local
    async function fetchCounts() {
      try {
        const pReq = await fetch("http://localhost:5000/produtos");
        const pRes = await pReq.json();
        setProdutosCount(Array.isArray(pRes) ? pRes.length : 0);

        const fReq = await fetch("http://localhost:5000/funcionarios");
        const fRes = await fReq.json();
        setFuncionariosCount(Array.isArray(fRes) ? fRes.length : 0);
      } catch (err) {
        console.log("Erro ao buscar contagens:", err.message);
      }
    }

    fetchCounts();
  }, []);

  // calcula quantos dias faltam até a data de validade (inteiro)
  const diasAteValidade = (dataStr) => {
    if (!dataStr) return null;
    // Garantir interpretação consistente: criar Date no horário UTC (meio-dia) para evitar problemas de timezone
    const target = new Date(dataStr + "T00:00:00");
    const hoje = new Date();
    // ignorar horário (trabalhar só com datas)
    const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const diffMs = target.getTime() - hojeSemHora.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  // produtos que vencem nos próximos 5 dias (inclui hoje e até +5)
  const produtosPertoVencer = Array.isArray(produtos)
    ? produtos.filter((p) => {
        const dias = diasAteValidade(p.dataValidade);
        return dias !== null && dias >= 0 && dias <= 5;
      })
    : [];

  return (
    <div className={styles.page}>
      <Container className={styles.container}>
        <Row className="mb-4">
          <Col>
            <h1 className={styles.title}>Bem vindo ao Stockly!</h1>
            <p className={styles.subtitle}>Painel para acesso rápido às principais áreas e informações.</p>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.cardInner}>
                  <div className={styles.cardIcon}><BsPeople /></div>
                  <div>
                    <div className={styles.cardLabel}>Fornecedores</div>
                    <div className={styles.cardValue}>{clientes.length}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.cardInner}>
                  <div className={styles.cardIcon}><BsBoxSeam /></div>
                  <div>
                    <div className={styles.cardLabel}>Produtos</div>
                    <div className={styles.cardValue}>{produtosCount}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.cardInner}>
                  <div className={styles.cardIcon}><BsPersonLinesFill /></div>
                  <div>
                    <div className={styles.cardLabel}>Funcionários</div>
                    <div className={styles.cardValue}>{funcionariosCount}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3">
          <h4>Atalhos:</h4>
          <Col md={3} sm={6}>
            <Card className={styles.linkCard} as={Link} to="/clientes">
              <Card.Body className={styles.linkBody}>
                <div className={styles.linkIcon}><BsPeople /></div>
                <div>
                  <div className={styles.linkTitle}>Fornecedores</div>
                  <div className={styles.linkDesc}>Listar e gerenciar fornecedores</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className={styles.linkCard} as={Link} to="/produtos">
              <Card.Body className={styles.linkBody}>
                <div className={styles.linkIcon}><BsBoxSeam /></div>
                <div>
                  <div className={styles.linkTitle}>Produtos</div>
                  <div className={styles.linkDesc}>Controle de estoque</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className={styles.linkCard} as={Link} to="/relatorios">
              <Card.Body className={styles.linkBody}>
                <div className={styles.linkIcon}><BsBuilding /></div>
                <div>
                  <div className={styles.linkTitle}>Relatórios</div>
                  <div className={styles.linkDesc}>Seus relatórios</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className={styles.linkCard} as={Link} to="/funcionarios">
              <Card.Body className={styles.linkBody}>
                <div className={styles.linkIcon}><BsPersonLinesFill /></div>
                <div>
                  <div className={styles.linkTitle}>Funcionários</div>
                  <div className={styles.linkDesc}>Equipe e cargos</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <div className={styles.footerNote}>Atalhos rápidos: clique em qualquer card para acessar.</div>
          </Col>
        </Row>
        {/* TABELA: Produtos perto de vencer (próximos 5 dias) - adicionado somente abaixo do conteúdo existente */}
        <Row className="mt-4">
          <Col>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Produtos próximo do vencimento</h4>
              <p className={styles.sectionSub}>Produtos com validade nos próximos 5 dias</p>
            </div>

            <div className={styles.tableContainer}>
              <table className={`table ${styles.table}`}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Código</th>
                    <th>Validade</th>
                    <th>Dias</th>
                    <th>Valor</th>
                  </tr>
                </thead>

                <tbody>
                  {produtosPertoVencer.length > 0 ? (
                    produtosPertoVencer.map((p) => {
                      const dias = diasAteValidade(p.dataValidade);
                      const alerta = dias !== null && dias <= 5;

                      return (
                        <tr key={p.id} className={alerta ? styles.alertRow : ""}>
                          <td>{p.nome}</td>
                          <td>{p.codigo}</td>
                          <td>{p.dataValidade}</td>
                          <td>
                            {alerta ? (
                              <span className={styles.badgeWarning} title="Prazo de validade próximo">
                                <BsExclamationTriangle /> {dias} dia{dias !== 1 ? "s" : ""}
                              </span>
                            ) : (
                              <span>{dias} dia{dias !== 1 ? "s" : ""}</span>
                            )}
                          </td>
                          <td>{p.valor}</td>
                          {/* coluna de ações removida — permanece somente informação */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className={styles.mensagemVazia}>Nenhum produto com validade próxima</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
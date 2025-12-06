// Importando components
import Grafico from "../../components/Grafico/Grafico.jsx";

import styles from "./Relatorios.module.css";

import { Row, Col, Container } from "react-bootstrap";

import { useMovimentacoes } from "../../hooks/useMovimentacoes.js";

const Relatorios = () => {
  const movimentacoes = useMovimentacoes();

  return (
    <div className={styles.Container}>
      <Container className={styles.container}>
        <Row>
          <Col>
            <h1 className={styles.Title}>Dashboard</h1>
          </Col>
        </Row>

        <div className={styles.GraficoWrapper}>
          <Grafico />
        </div>

        <h4 className={styles.Title}>Histórico de Movimentações</h4>
        <p className={styles.SubTitle}>Entrada e Saída de produtos</p>
        
        {/* TABELA DE MOVIMENTAÇÕES */}
        <Row className={styles.TabelaWrapper}>
          <Col>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {movimentacoes.length === 0 ? (
                  <tr>
                    <td colSpan="4">Nenhuma movimentação encontrada</td>
                  </tr>
                ) : (
                  movimentacoes.map((mov) => (
                    <tr key={mov.id}>
                      <td>{mov.produto?.nome_prod}</td>
                      <td
                        style={{
                          color: mov.tipo === "ENTRADA" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {mov.tipo}
                      </td>
                      <td>{mov.quantidade}</td>
                      <td>{new Date(mov.data).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Relatorios;

// Importando components
import Grafico from "../../components/Grafico/Grafico.jsx";

import styles from "./Relatorios.module.css";

import { Row, Col } from "react-bootstrap";

// IMPORTANTE: importar o hook de movimentações
import { useMovimentacoes } from "../../hooks/useMovimentacoes.js";

const Relatorios = () => {
  const movimentacoes = useMovimentacoes();

  return (
    <div style={{ padding: "20px" }}>
      <Grafico />

      {/* TABELA DE MOVIMENTAÇÕES */}
      <Row className="mt-4">
        <Col>
          <h4 className={styles.Title}>Histórico de Movimentações</h4>
          <p className={styles.SubTitle}>Entradas e saídas de produtos</p>

          <table className="table table-striped">
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
    </div>
  );
};

export default Relatorios;

import Grafico from "../../components/Grafico/Grafico.jsx";
import styles from "./Relatorios.module.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useMovimentacoes, useMovimentacoesRecarga } from "../../hooks/useMovimentacoes.js";
import jsPDF from "jspdf";
import { FaSyncAlt } from "react-icons/fa"; // ✅ ÍCONE DE ATUALIZAR

const Relatorios = () => {
  const movimentacoes = useMovimentacoes() || [];
  const { limparMovimentacoes, fetchMovimentacoes } = useMovimentacoesRecarga();

  function exportarPDF() {
    const pdf = new jsPDF();
    pdf.text("Relatório de Movimentações", 10, 10);

    movimentacoes.forEach((mov, index) => {
      pdf.text(
        `${index + 1} - ${mov.produto} | ${mov.tipo} | ${mov.quantidade} | ${new Date(
          mov.data
        ).toLocaleString("pt-BR")}`,
        10,
        20 + index * 8
      );
    });

    pdf.save("relatorio_movimentacoes.pdf");
  }

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

        {/* ✅ BOTÃO ATUALIZAR PEQUENO, AZUL E COM ÍCONE */}
        <Row className="justify-content-end mb-2">
          <Col md="auto">
            <Button
              size="sm"
              style={{ backgroundColor: "#344250", border: "none" }}
              onClick={fetchMovimentacoes}
            >
              <FaSyncAlt style={{ marginRight: "6px" }} />
              Atualizar
            </Button>
          </Col>
        </Row>

        {/* ✅ BOTÕES PRINCIPAIS */}
        <Row className="d-flex justify-content-center gap-3 mb-4">
          <Button variant="danger" onClick={limparMovimentacoes}>
            Limpar Histórico
          </Button>

          <Button variant="success" onClick={exportarPDF}>
            Exportar PDF
          </Button>
        </Row>

        <h4 className={styles.Title}>Histórico de Movimentações</h4>

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
                  movimentacoes.map((mov, index) => (
                    <tr key={index}>
                      <td>{mov.produto}</td>
                      <td
                        style={{
                          color: mov.tipo === "Entrada" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {mov.tipo}
                      </td>
                      <td>{mov.quantidade}</td>
                      <td>{new Date(mov.data).toLocaleString("pt-BR")}</td>
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

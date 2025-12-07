import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
import styles from "./Grafico.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useMemo } from "react";
import { useMovimentacoes } from "../../hooks/useMovimentacoes.js";

export default function Grafico() {
  const movimentacoes = useMovimentacoes() || [];
  const [filtro, setFiltro] = useState("anual");

  // Meses em PT-BR
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Processa as movimentações e soma por mês
  const dadosProcessados = useMemo(() => {
    const base = meses.map((mes) => ({
      mes,
      Entrada: 0,
      Saída: 0,
    }));

    movimentacoes.forEach((mov) => {
      const data = new Date(mov.data);
      if (!isNaN(data)) {
        const mesIndex = data.getMonth();
        if (mov.tipo === "Entrada") {
          base[mesIndex].Entrada += Number(mov.quantidade);
        } else if (mov.tipo === "Saída") {
          base[mesIndex].Saída += Number(mov.quantidade);
        }
      }
    });

    return base;
  }, [movimentacoes]);

  // Aplica o filtro sem modificar estado durante renderização
  const dadosFiltrados = useMemo(() => {
    switch (filtro) {
      case "semanal":
        return dadosProcessados.slice(-1); // último mês
      case "trimestral":
        return dadosProcessados.slice(-3);
      case "semestral":
        return dadosProcessados.slice(-6);
      case "anual":
      default:
        return dadosProcessados;
    }
  }, [filtro, dadosProcessados]);

  return (
    <div className={styles.pages}>
      <Container className={styles.container}>
        {/* BOTÕES DE FILTRO */}
        <Row className="mb-3">
          <Col className={styles.Filtros}>
            <Button
              variant={filtro === "semanal" ? "primary" : "outline-primary"}
              onClick={() => setFiltro("semanal")}
            >
              Semanal
            </Button>

            <Button
              variant={filtro === "trimestral" ? "primary" : "outline-primary"}
              onClick={() => setFiltro("trimestral")}
            >
              Trimestral
            </Button>

            <Button
              variant={filtro === "semestral" ? "primary" : "outline-primary"}
              onClick={() => setFiltro("semestral")}
            >
              Semestral
            </Button>

            <Button
              variant={filtro === "anual" ? "primary" : "outline-primary"}
              onClick={() => setFiltro("anual")}
            >
              Anual
            </Button>
          </Col>
        </Row>

        {/* GRÁFICO */}
        <div className={styles.GraficoBox}>
          <BarChart width={700} height={350} data={dadosFiltrados}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="mes" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Entrada" fill="green" />
            <Bar dataKey="Saída" fill="red" />
          </BarChart>
        </div>
      </Container>
    </div>
  );
}

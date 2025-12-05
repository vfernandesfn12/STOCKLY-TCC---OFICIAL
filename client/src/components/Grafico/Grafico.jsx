import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

import styles from "./Grafico.module.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

// DADOS ORIGINAIS
const chartData = [
  { mes: "Jan", Entrada: 186, Saída: 80 },
  { mes: "Fev", Entrada: 305, Saída: 200 },
  { mes: "Mar", Entrada: 237, Saída: 120 },
  { mes: "Abr", Entrada: 73, Saída: 190 },
  { mes: "Mai", Entrada: 209, Saída: 130 },
  { mes: "Jun", Entrada: 214, Saída: 140 },
  { mes: "Jul", Entrada: 240, Saída: 90 },
  { mes: "Ago", Entrada: 224, Saída: 500 },
  { mes: "Set", Entrada: 180, Saída: 200 },
  { mes: "Out", Entrada: 300, Saída: 80 },
  { mes: "Nov", Entrada: 210, Saída: 150 },
  { mes: "Dez", Entrada: 310, Saída: 100 },
];

export default function Grafico() {
  const [filtro, setFiltro] = useState("anual");
  const [dadosFiltrados, setDadosFiltrados] = useState(chartData);

  // FUNÇÃO PARA APLICAR O FILTRO
  function aplicarFiltro(tipo) {
    setFiltro(tipo);

    switch (tipo) {
      case "semanal":
        // 7 últimos dias (fake por enquanto — usa os últimos 2 meses)
        setDadosFiltrados(chartData.slice(-2));
        break;

      case "trimestral":
        // últimos 3 meses
        setDadosFiltrados(chartData.slice(-3));
        break;

      case "semestral":
        // últimos 6 meses
        setDadosFiltrados(chartData.slice(-6));
        break;

      case "anual":
      default:
        // Todos os 12 meses
        setDadosFiltrados(chartData);
        break;
    }
  }

  return (
    <div
      className={styles.pages}
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Container className={styles.container}>
        <Row>
          <Col>
            <h1 className={styles.Title}>Dashboard</h1>
          </Col>
        </Row>

        {/* BOTÕES DE FILTRO */}
        <Row className="mb-3">
          <Col style={{ display: "flex", gap: "10px" }}>
            <Button
              variant={filtro === "semanal" ? "primary" : "outline-primary"}
              onClick={() => aplicarFiltro("semanal")}
            >
              Semanal
            </Button>

            <Button
              variant={filtro === "trimestral" ? "primary" : "outline-primary"}
              onClick={() => aplicarFiltro("trimestral")}
            >
              Trimestral
            </Button>

            <Button
              variant={filtro === "semestral" ? "primary" : "outline-primary"}
              onClick={() => aplicarFiltro("semestral")}
            >
              Semestral
            </Button>

            <Button
              variant={filtro === "anual" ? "primary" : "outline-primary"}
              onClick={() => aplicarFiltro("anual")}
            >
              Anual
            </Button>
          </Col>
        </Row>

        {/* GRÁFICO */}
        <BarChart width={700} height={350} data={dadosFiltrados}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="mes" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Entrada" fill="green" />
          <Bar dataKey="Saída" fill="red" />
        </BarChart>
      </Container>
    </div>
  );
}

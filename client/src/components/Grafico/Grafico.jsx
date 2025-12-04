import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

import styles from "./Grafico.module.css";

import { Container, Row, Col } from "react-bootstrap";

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

        <BarChart width={700} height={350} data={chartData}>
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

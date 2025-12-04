import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

import styles from "./Grafico.module.css";

import { Container, Row, Col } from "react-bootstrap";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
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
          <XAxis dataKey="month" />
          <Tooltip />
          <Legend />
          <Bar dataKey="desktop" fill="#8884d8" />
          <Bar dataKey="mobile" fill="#82ca9d" />
        </BarChart>
      </Container>
    </div>
  );
}

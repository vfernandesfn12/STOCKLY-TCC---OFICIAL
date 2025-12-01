import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    console.log("Dados cadastrados:", form);
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className={styles.pageCadastro}>
      <Container className="justify-content-center align-content-center min-vh-100">
        <Row>
          <Col>
            <img
              src={logo}
              alt=""
              width={"600px"}
              height={"600px"}
              // className="img-fluid mb-3"
            />
          </Col>

          <Col className="d-flex flex-column">
            <div>
              {erro && (
                <Alert variant="danger" onClose={() => setErro("")} dismissible>
                  {erro}
                </Alert>
              )}

              <Form className={styles.formlogin} onSubmit={handleSubmit} style={{ width: "75%", margin: "auto", textAlign: "center" }}>

                <h2 className="text-center text-light mb-4">Cadastro</h2>

                <FloatingLabel
                  controlId="inputNome"
                  label="Nome"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="inputEmail"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="inputSenha"
                  label="Senha"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={form.senha}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="inputConfirmarSenha"
                  label="Confirmar Senha"
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <div>
                  <Button variant="primary" type="submit" size="lg" style={{backgroundColor: "#344250"}}>
                    Cadastrar
                  </Button>
                </div>

                <p className="text-center text-light mt-3">
                  Já possui conta?{" "}
                  <span
                    className={styles.link}
                    onClick={() => navigate("/login")}
                  >
                    Faça login
                  </span>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

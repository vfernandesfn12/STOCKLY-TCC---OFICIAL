import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useForm } from "react-hook-form";
import {
  useListaDepartamentos,
  useInserirFuncionario,
  useAtualizarFuncionario,
} from "../../hooks/UseFuncionarios";

const FormularioFuncionario = (props) => {
  const navigate = useNavigate();

  const { inserirFuncionario } = useInserirFuncionario();
  const { atualizarFuncionario } = useAtualizarFuncionario();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const departamentos = useListaDepartamentos();

  useEffect(() => {
    if (props.page === "editar" && props.funcionario) {
      reset({
        nome_funcionario: props.funcionario.nome_funcionario,
        cpf: props.funcionario.cpf,
        telefone: props.funcionario.telefone,
        email: props.funcionario.email,
        departamento: props.funcionario.departamento,
        cargo: props.funcionario.cargo,
        // Senha NÃO entra aqui (segurança)
      });
    }
  }, [props.funcionario, props.page, reset]);

  const onSubmit = async (data) => {
    if (props.page === "cadastro") {
      // SALVA FUNCIONÁRIO
      await inserirFuncionario({
        nome_funcionario: data.nome_funcionario,
        cpf: data.cpf,
        telefone: data.telefone,
        email: data.email,
        departamento: data.departamento,
        cargo: data.cargo,
        senha: data.senha,
        tipo: "funcionario",
      });

      //CRIA USUÁRIO PARA LOGIN
      await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome_funcionario,
          email: data.email,
          senha: data.senha,
          tipo: "funcionario",
          imagemUrl: "https://via.placeholder.com/150",
        }),
      });

      alert("Funcionário cadastrado com sucesso!");
    } else {
      await atualizarFuncionario(data, props.funcionario.id);
      alert("Funcionário atualizado com sucesso!");
    }

    navigate("/funcionarios");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "100%", maxWidth: "900px" , color: "white"}}>
        <Card.Body>
          <h2 className="text-center mb-4">
            {props.page === "editar"
              ? "Editar Funcionário"
              : "Cadastro de Funcionário"}
          </h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* NOME E CARGO */}
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Nome" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("nome_funcionario", {
                      required: "O nome é obrigatório",
                    })}
                  />
                  {errors.nome_funcionario && (
                    <small className="text-danger">
                      {errors.nome_funcionario.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Cargo" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("cargo", {
                      required: "O cargo é obrigatório",
                    })}
                  />
                  {errors.cargo && (
                    <small className="text-danger">
                      {errors.cargo.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* CPF E TELEFONE */}
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="CPF" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("cpf", {
                      required: "O CPF é obrigatório",
                    })}
                  />
                  {errors.cpf && (
                    <small className="text-danger">
                      {errors.cpf.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Telefone" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("telefone", {
                      required: "O telefone é obrigatório",
                    })}
                  />
                  {errors.telefone && (
                    <small className="text-danger">
                      {errors.telefone.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* EMAIL E SENHA */}
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "O email é obrigatório",
                    })}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>

              {props.page === "cadastro" && (
                <Col md={6}>
                  <FloatingLabel label="Senha" className="mb-3">
                    <Form.Control
                      type="password"
                      {...register("senha", {
                        required: "A senha é obrigatória",
                        minLength: {
                          value: 6,
                          message: "A senha deve ter no mínimo 6 caracteres",
                        },
                      })}
                    />
                    {errors.senha && (
                      <small className="text-danger">
                        {errors.senha.message}
                      </small>
                    )}
                  </FloatingLabel>
                </Col>
              )}
            </Row>

            {/* DEPARTAMENTOSSSSSSSSS */}
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Departamento" className="mb-3">
                  <Form.Select
                    {...register("departamento", {
                      validate: (value) =>
                        value !== "0" || "Escolha um departamento",
                    })}
                  >
                    <option value="0">Escolha um departamento</option>
                    {departamentos.map((dep) => (
                      <option key={dep.id} value={dep.nome}>
                        {dep.nome}
                      </option>
                    ))}
                  </Form.Select>

                  {errors.departamento && (
                    <small className="text-danger">
                      {errors.departamento.message}
                    </small>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* BOTÃO */}
            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" size="lg">
                {props.page === "editar" ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormularioFuncionario;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { useForm } from "react-hook-form";
import {
  useListaDepartamentos,
  useInserirFuncionario,
  useAtualizarFuncionario,
} from "../../hooks/UseFuncionarios";

const FormularioFuncionario = (props) => {
  const navigate = useNavigate();

  // Hooks
  const { inserirFuncionario } = useInserirFuncionario();
  const { atualizarFuncionario } = useAtualizarFuncionario();

  // Formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Departamentos
  const departamentos = useListaDepartamentos();

  // Preencher formulário ao EDITAR
  useEffect(() => {
    if (props.page === "editar" && props.funcionario) {
      reset({
        nome_funcionario: props.funcionario.nome_funcionario,
        cpf: props.funcionario.cpf,
        telefone: props.funcionario.telefone,
        email: props.funcionario.email,
        departamento: props.funcionario.departamento,
        cargo: props.funcionario.cargo,
        fotoUrl: props.funcionario.fotoUrl,
      });
    }
  }, [props.funcionario, props.page, reset]);

  // Imagem padrão
  const linkImagem =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA13yHQQqIo0itjIvx5np_T1BJcqtKSwErqQ&s";

  const imagemAtual = watch("fotoUrl");

  // SUBMIT
  const onSubmit = async (data) => {
    if (props.page === "cadastro") {
      // 1️⃣ Cria funcionário
      await inserirFuncionario({
        nome_funcionario: data.nome_funcionario,
        cpf: data.cpf,
        telefone: data.telefone,
        email: data.email,
        departamento: data.departamento,
        cargo: data.cargo,
        fotoUrl: data.fotoUrl,
      });

      alert("Funcionário cadastrado e usuário criado com sucesso!");
    } else {
      await atualizarFuncionario(data, props.funcionario.id);
      alert("Funcionário atualizado com sucesso!");
    }

    navigate("/funcionarios");
  };

  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form
        style={{ padding: "1.5rem", color: "#ecf0f1" }}
        className="mt-3 w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h1 className="mb-5">
          {props.page === "editar"
            ? "Editar Funcionário"
            : "Cadastro de Funcionário"}
        </h1>

        <Row>
          <Col md={12} lg={6}>
            {/* NOME */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome_funcionario", {
                  required: "O nome é obrigatório",
                })}
              />
              {errors.nome_funcionario && (
                <p className="error">{errors.nome_funcionario.message}</p>
              )}
            </FloatingLabel>

            {/* CPF */}
            <FloatingLabel controlId="FI-CPF" label="CPF" className="mb-5">
              <Form.Control
                type="text"
                {...register("cpf", { required: "O CPF é obrigatório" })}
              />
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </FloatingLabel>

            {/* TELEFONE */}
            <FloatingLabel controlId="FI-TELEFONE" label="Telefone" className="mb-5">
              <Form.Control
                type="text"
                {...register("telefone", { required: "O telefone é obrigatório" })}
              />
              {errors.telefone && (
                <p className="error">{errors.telefone.message}</p>
              )}
            </FloatingLabel>

            {/* EMAIL */}
            <FloatingLabel controlId="FI-EMAIL" label="Email" className="mb-5">
              <Form.Control
                type="email"
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>

            {/* DEPARTAMENTO */}
            <FloatingLabel
              controlId="FI-DEPARTAMENTO"
              label="Departamento"
              className="mb-5"
            >
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
                <p className="error">{errors.departamento.message}</p>
              )}
            </FloatingLabel>
          </Col>

          {/* LADO DIREITO */}
          <Col md={12} lg={6}>
            {/* CARGO */}
            <FloatingLabel controlId="FI-CARGO" label="Cargo" className="mb-5">
              <Form.Control
                type="text"
                {...register("cargo", { required: "O cargo é obrigatório" })}
              />
              {errors.cargo && (
                <p className="error">{errors.cargo.message}</p>
              )}
            </FloatingLabel>

            {/* SENHA */}
            {props.page === "cadastro" && (
              <FloatingLabel controlId="FI-SENHA" label="Senha" className="mb-5">
                <Form.Control
                  type="password"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                    minLength: {
                      value: 3,
                      message: "A senha deve ter no mínimo 3 caracteres",
                    },
                  })}
                />
                {errors.senha && (
                  <p className="error">{errors.senha.message}</p>
                )}
              </FloatingLabel>
            )}

            {/* FOTO */}
            <Form.Group controlId="FI-FOTO" className="mb-5">
              <FloatingLabel label="Link da foto" className="mb-3">
                <Form.Control type="url" {...register("fotoUrl")} />
              </FloatingLabel>

              <Image
                width={200}
                height={200}
                rounded
                src={imagemAtual ? imagemAtual : linkImagem}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* BOTÃO */}
        <Button variant="primary" size="lg" type="submit">
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioFuncionario;
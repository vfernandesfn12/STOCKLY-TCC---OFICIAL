// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importando a função useForm do react-hook-form
import { useForm } from "react-hook-form";

// Importando os hooks de funcionários
import {
  useListaDepartamentos,
  useInserirFuncionario,
} from "../../hooks/UseFuncionarios";

const FormularioFuncionario = (props) => {
  // Hook de inserção de funcionário
  const { inserirFuncionario } = useInserirFuncionario();

  // Controle do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Lista de departamentos
  const departamentos = useListaDepartamentos();

  // Variável de funcionário sem imagem
  const linkImagem =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA13yHQQqIo0itjIvx5np_T1BJcqtKSwErqQ&s";

  // Variável para armazenar o link da imagem, vindo do input
  const imagemAtual = watch("fotoUrl");

  // Função ao enviar formulário com sucesso
  const onSubmit = (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      inserirFuncionario(data);
      alert("Funcionário cadastrado com sucesso");
    } else {
      // Aqui poderia ser edição
    }
  };

  // Função ao ocorrer erro na validação
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
        <h1 className="mb-5">Cadastro de Funcionário</h1>
        <Row>
          <Col md={12} lg={6}>
            {/* Nome do Funcionário */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome_funcionario", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "O nome deve ter no máximo 50 caracteres",
                  },
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
                {...register("cpf", {
                  required: "O CPF é obrigatório",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: "Insira um CPF válido (ex: 000.000.000-00)",
                  },
                })}
              />
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </FloatingLabel>

            {/* Telefone */}
            <FloatingLabel controlId="FI-TELEFONE" label="Telefone" className="mb-5">
              <Form.Control
                type="text"
                {...register("telefone", {
                  required: "O telefone é obrigatório",
                  pattern: {
                    value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                    message: "Insira um telefone válido",
                  },
                })}
              />
              {errors.telefone && <p className="error">{errors.telefone.message}</p>}
            </FloatingLabel>

            {/* Email */}
            <FloatingLabel controlId="FI-EMAIL" label="Email" className="mb-5">
              <Form.Control
                type="email"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Insira um email válido",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>

            {/* Departamento */}
            <FloatingLabel controlId="FI-DEPARTAMENTO" label="Departamento" className="mb-5">
              <Form.Select
                {...register("departamento", {
                  validate: (value) => value !== "0" || "Escolha um departamento",
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

          {/* CARGO */}
          <Col md={12} lg={6}>
          <FloatingLabel controlId="FI-CARGO" label="Cargo" className="mb-5">
              <Form.Control
                type="text"
                {...register("cargo", {
                  required: "O cargo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O cargo deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "O cargo deve ter no máximo 30 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.marca && (
                <p className="error"> {errors.cargo.message} </p>
              )}
            </FloatingLabel>
            {/* Foto do Funcionário */}
            <Form.Group controlId="FI-FOTO" className="mb-5">
              <FloatingLabel controlId="FI-FOTO-LINK" label="Link da foto" className="mb-5">
                <Form.Control
                  type="url"
                  {...register("fotoUrl", {
                    required: "O link da foto é obrigatório",
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "Insira um link válido",
                    },
                  })}
                />
                {errors.fotoUrl && <p className="error">{errors.fotoUrl.message}</p>}
              </FloatingLabel>
              <Image
                width={200}
                height={200}
                rounded
                src={imagemAtual === "" ? linkImagem : imagemAtual}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Botão */}
        <Button
          variant="primary"
          size="lg"
          type="submit"
        >
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioFuncionario;

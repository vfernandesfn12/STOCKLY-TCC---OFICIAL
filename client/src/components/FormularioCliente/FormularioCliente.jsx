// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Importando o hook useInserirCliente
import {
  useInserirCliente
} from "../../hooks/useClientes";

const FormularioCliente = (props) => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  // IMPORTAÇÃO DOS HOOKS PARA INSERIR, E ATUALIZAR
  // Usando a funcao de inserir Cliente vinda do hook
  const { inserirCliente } = useInserirCliente();

  // Criando o navigate
  const navigate = useNavigate();

  // Lista de estados Brasil 
  const estados = [
  { id: 1, sigla: "AC", nome: "Acre" },
  { id: 2, sigla: "AL", nome: "Alagoas" },
  { id: 3, sigla: "AP", nome: "Amapá" },
  { id: 4, sigla: "AM", nome: "Amazonas" },
  { id: 5, sigla: "BA", nome: "Bahia" },
  { id: 6, sigla: "CE", nome: "Ceará" },
  { id: 7, sigla: "DF", nome: "Distrito Federal" },
  { id: 8, sigla: "ES", nome: "Espírito Santo" },
  { id: 9, sigla: "GO", nome: "Goiás" },
  { id: 10, sigla: "MA", nome: "Maranhão" },
  { id: 11, sigla: "MT", nome: "Mato Grosso" },
  { id: 12, sigla: "MS", nome: "Mato Grosso do Sul" },
  { id: 13, sigla: "MG", nome: "Minas Gerais" },
  { id: 14, sigla: "PA", nome: "Pará" },
  { id: 15, sigla: "PB", nome: "Paraíba" },
  { id: 16, sigla: "PR", nome: "Paraná" },
  { id: 17, sigla: "PE", nome: "Pernambuco" },
  { id: 18, sigla: "PI", nome: "Piauí" },
  { id: 19, sigla: "RJ", nome: "Rio de Janeiro" },
  { id: 20, sigla: "RN", nome: "Rio Grande do Norte" },
  { id: 21, sigla: "RS", nome: "Rio Grande do Sul" },
  { id: 22, sigla: "RO", nome: "Rondônia" },
  { id: 23, sigla: "RR", nome: "Roraima" },
  { id: 24, sigla: "SC", nome: "Santa Catarina" },
  { id: 25, sigla: "SP", nome: "São Paulo" },
  { id: 26, sigla: "SE", nome: "Sergipe" },
  { id: 27, sigla: "TO", nome: "Tocantins" },
]

    // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    data.status = "Ativo";
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir o produto
      inserirCliente(data);
      alert("Cliente cadastrado com sucesso!");
    } else {
     
    }
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };
  return (
    <div className="text-center">
      <Form 
      className="mt-3 w-full" 
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{ padding: "1.5rem", color: "#ecf0f1" }}
      >
        <h1 className="mb-5">Cadastro de Fornecedores</h1>
        
        <Row>
          <Col md={12} lg={6}>
            {/* Caixinha de nome */}
            <FloatingLabel
              controlId="floatingInputNomeCompleto"
              label="Nome Empresa"
              className="mb-5"
            >
              <Form.Control
                placeholder="Digite o nome completo da empresa"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O nome deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>

            {/* Caixinha de email */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-5"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Email inválido",
                  },
                  validate: (value) => value.includes("@") || "Email inválido",
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>
          </Col>
          <Col>
            <Row>
              <Col className="col-8">
                {/* Caixinha de documento */}
                <FloatingLabel
                  controlId="floatingInputDocumento"
                  label="N° Documento"
                  className="mb-5"
                >
                  <Form.Control
                    type="text"
                    placeholder="Digite o número do documento"
                    {...register("documento", {
                      required: "O número do documento é obrigatório",
                      minLength: {
                        value: 2,
                        message:
                          "O número do documento deve ter pelo menos 2 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "O número do documento deve ter ate 100 caracteres",
                      },
                    })}
                  />
                  {errors.documento && (
                    <p className="error">{errors.documento.message}</p>
                  )}
                </FloatingLabel>
              </Col>
              <Col className="col-4">
                {/* Select de tipo */}
                <FloatingLabel
                  controlId="floatingSelectTipo"
                  label="Tipo"
                  className="mb-5"
                  defaultValue={0}
                >
                  <Form.Select
                    {...register("tipo", {
                      validate: (value) => value !== "0" || "Escolha um tipo ",
                    })}
                  >
                    <option value="0" > Escolha um tipo </option>
                    <option value="Alimentos"> Alimentos </option>
                    <option value="Bebidas"> Bebidas </option>
                    <option value="Congelados"> Congelados </option>
                    <option value="Outros"> Outros </option>
                  </Form.Select>
                  {errors.tipo && (
                    <p className="error">{errors.tipo.message}</p>
                  )}
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="col-6">
                {/* Caixinha de telefone */}
                <FloatingLabel
                  controlId="floatingInputTelefone"
                  label="Telefone"
                  className="mb-5"
                >
                  <Form.Control
                    type="text"
                    placeholder="Digite a telefone do produto"
                    {...register("telefone", {
                      required: "O telefone é obrigatório",
                      minLength: {
                        value: 2,
                        message: "O telefone deve ter pelo menos 2 caracteres",
                      },
                      maxLength: {
                        value: 180,
                        message: "O telefone deve ter ate 180 caracteres",
                      },
                    })}
                  />
                  {errors.telefone && (
                    <p className="error">{errors.telefone.message}</p>
                  )}
                </FloatingLabel>
              </Col>
              <Col className="col-6">
                {/* Caixinha de nascimento */}
                <FloatingLabel
                  controlId="floatingInputNascimento"
                  label="Data de cadastro"
                  className="mb-5"
                >
                  <Form.Control
                    type="date"
                    placeholder="Digite a data de cadastro"
                    {...register("dataNascimento", {
                      required: "A data de cadastro é obrigatório",
                    })}
                  />
                  {errors.dataNascimento && (
                    <p className="error">{errors.dataNascimento.message}</p>
                  )}
                </FloatingLabel>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <h5 className=" text-start">Endereço</h5>
          <Col md={12} lg={4}>
            {/* Caixinha de Cep */}
            <FloatingLabel controlId="Cep" label="Cep" className="mb-5">
              <Form.Control
                type="text"
                placeholder="Digite o cep"
                {...register("endereco.cep", {
                  required: "O cep é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O cep deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O cep deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.cep && <p className="error">{errors.cep.message}</p>}
            </FloatingLabel>

            {/* Caixinha de logradouro */}
            <FloatingLabel
              controlId="floatingInputLogradouro"
              label="Logradouro"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o logradouro do cliente"
                {...register("endereco.logradouro", {
                  required: "O logradouro é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O logradouro deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O logradouro deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.logradouro && (
                <p className="error">{errors.logradouro.message}</p>
              )}
            </FloatingLabel>
          </Col>
          <Col md={12} lg={4}>
            {/* Caixinha de complemento */}
            <FloatingLabel
              controlId="floatingInputComplemento"
              label="Complemento"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o complemento do endereço"
                {...register("endereco.complemento", {
                  required: "O complemento é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O complemento deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O complemento deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.complemento && (
                <p className="error">{errors.complemento.message}</p>
              )}
            </FloatingLabel>

            {/* Caixinha de bairro */}
            <FloatingLabel
              controlId="floatingInputBairro"
              label="Bairro"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o bairro do cliente"
                {...register("endereco.bairro", {
                  required: "O bairro é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O bairro deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "O bairro deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.bairro && (
                <p className="error">{errors.bairro.message}</p>
              )}
            </FloatingLabel>
          </Col>
          <Col md={12} lg={4}>
            {/* Caixinha de Cidade */}
            <FloatingLabel
              controlId="floatingInputCidade"
              label="Cidade"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o cidade do cliente"
                {...register("endereco.cidade", {
                  required: "A cidade é obrigatório",
                  minLength: {
                    value: 2,
                    message: "A cidade deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "A cidade deve ter ate 100 caracteres",
                  },
                })}
              />
              {errors.cidade && (
                <p className="error">{errors.cidade.message}</p>
              )}
            </FloatingLabel>

            {/* Select de UF */}
            <FloatingLabel
              controlId="floatingSelectUF"
              label="UF"
              className="mb-5"
            >
              <Form.Select
                {...register("endereco.uf", {
                  validate: (value) => value !== "0" || "Escolha uma uf",
                })}
              >
                <option value="0"> Escolha um tipo </option>
                {estados.map((estado, index) => (
                  <option
                    key={estado.id}
                    value={estado.sigla}
                    // é pra ser selected, mas tá reclamando
                    defaultValue={
                      props.page === "editar" &&
                      watch("endereco.uf") === estado.sigla
                    }
                  >
                    {estado.sigla}
                  </option>
                ))}
              </Form.Select>
              {errors.uf && <p className="error">{errors.uf.message}</p>}
            </FloatingLabel>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de produto */}
        <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: "#344250" }}>
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioCliente;
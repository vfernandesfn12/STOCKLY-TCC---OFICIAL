// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

// Importando o hook de produtos
import { useInserirProduto } from "../../hooks/UseProdutos";

const FormularioProduto = (props) => {

//IMPORTAÇÂO DAS FUNÇÕES DO HOOK USEPRODUTOS
//usando a função de inserir produto
const { inserirProduto } = useInserirProduto();

  // register = cria um objeto com os valores retirados dos inputs
  // handleSumbit = envia os dados formulário, caso dê erro ou sucesso
  // formState { errors } = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  // FUNÇÕES QUE LIDAM COM O SUCESSO OU ERRO DO FORMUÁRIO
  // Função para caso dê certo na validação do formulário
  // datat é o objeto com os dados do formulário

  const onSubmit = async (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      //Envia o objeto data para o hook inserir produto
      inserirProduto(data);
      alert("Produto cadastrado com sucesso!");
    } else {
      // Depois nòis ve
    }
  };

  // Caso tenha algum erro no formulário, mostra as mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}
      style={{maxWidth:"720px", marginLeft:"200px"}}>
        <Form.Label as="h1" className="text-center mb-5 text-white">
          {" "}
          Cadastrar Produto{" "}
        </Form.Label>
        <Row>
          <Col md={12} lg={12}>
            {/* Caixinha de Nome */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "O nome deve ter no máximo 30 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.nome && <p className="error"> {errors.nome.message} </p>}
            </FloatingLabel>
            {/* Fim de caixinha de Nome */}

            {/* Caixinha de SKU */}
            <FloatingLabel
              controlId="FI-CODIGO"
              label="Código"
              className="mb-5"
            >
              <Form.Control
                type="text"
                {...register("codigo", {
                  required: "O código é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O código deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 10,
                    message: "O código deve ter no máximo 10 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.codigo && (
                <p className="error"> {errors.codigo.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de SKU */}

            {/* Caixinha de descrição */}
            <FloatingLabel
              controlId="FI-DESCRICAO"
              label="Descrição"
              className="mb-5"
            >
              <Form.Control
                style={{
                  height: "120px",
                  borderColor: "#5F6D7C",
                }} // Altura maior
                as="textarea" // isso transforma em área de texto
                type="text"
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: {
                    value: 2,
                    message: "A descrição deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "A descrição deve ter no máximo 100 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.descricao && (
                <p className="error"> {errors.descricao.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de descrição */}
          </Col>
        </Row>

        {/* Data Entrada e Tipo do produto */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel controlId="FI-DATAENTRADA" label="Data Entrada">
              <Form.Control
                type="date"
                {...register("dataEntrada", {
                  required: "A data de entrada é obrigatória",
                })}
              />
              {errors.dataEntrega && (
                <p className="error"> {errors.dataEntrega.message} </p>
              )}
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="FI-TIPOPRODUTO" label="Tipo do Produto">
              <Form.Select
                aria-label="Tipo do produto"
                {...register("tipoProduto", {
                  required: "O tipo do produto é obrigatório",
                })}
              >
                <option value="">Selecione</option>
                <option value="Bebida">Bebida</option>
                <option value="Comida">Comida</option>
                <option value="Congelados">Congelados</option>
                <option value="Higiene">Higiene</option>
                <option value="Outro">Outro</option>
              </Form.Select>
              {errors.tipoProduto && (
                <p className="error"> {errors.tipoProduto.message} </p>
              )}
            </FloatingLabel>
          </Col>
        </Row>

        {/* Data Validade e Valor */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel controlId="FI-DATAVALIDADE" label="Data Validade">
              <Form.Control
                type="date"
                {...register("dataValidade", {
                  required: "A data de validade é obrigatório",
                  min: {
                    value: 0.01,
                    message: "A data de validade deve ser maior que 0",
                  },
                })}
              />
              {errors.dataValidade && (
                <p className="error"> {errors.dataValidade.message} </p>
              )}
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="FI-VALOR" label="Valor (R$)">
              <Form.Control
                type="number"
                step="0.01"
                {...register("valor", {
                  required: "O valor é obrigatório",
                  min: {
                    value: 0.01,
                    message: "O valor deve ser maior que 0",
                  },
                })}
              />
              {errors.valor && (
                <p className="error"> {errors.valor.message} </p>
              )}
            </FloatingLabel>
          </Col>
        </Row>

        {/* Botão para envio do formulário */}
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: "#344250" }}>
            {props.page === "editar" ? "Atualizar" : "Cadastrar"}
          </Button>
          <Button
            type="button"
            variant="danger"
            className="mt-6 px-4"
            onClick={() => {
              // Função para limpar o formulário
              reset(); // função do useForm para limpar
            }}
          >
            Limpar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormularioProduto

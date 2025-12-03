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
  //IMPORTAÇÃO DAS FUNÇÕES DO HOOK USEPRODUTOS
  const { inserirProduto } = useInserirProduto();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Funções de sucesso ou erro
  const onSubmit = async (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      inserirProduto(data);
      alert("Produto cadastrado com sucesso!");
    } else {
      // Depois ajusta para edição
    }
  };

  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form
        className="mt-3 w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
        style={{ maxWidth: "720px", marginLeft: "200px" }}
      >
        <Form.Label as="h1" className="text-center mb-5 text-white">
          Cadastrar Produto
        </Form.Label>

        <Row>
          <Col md={12} lg={12}>
            {/* Nome */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                  maxLength: { value: 30, message: "Máximo de 30 caracteres" },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>

            {/* Código */}
            <FloatingLabel controlId="FI-CODIGO" label="Código" className="mb-5">
              <Form.Control
                type="text"
                {...register("codigo", {
                  required: "O código é obrigatório",
                  minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                  maxLength: { value: 10, message: "Máximo de 10 caracteres" },
                })}
              />
              {errors.codigo && <p className="error">{errors.codigo.message}</p>}
            </FloatingLabel>

            {/* Descrição */}
            <FloatingLabel controlId="FI-DESCRICAO" label="Descrição" className="mb-5">
              <Form.Control
                as="textarea"
                style={{ height: "120px", borderColor: "#5F6D7C" }}
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                  maxLength: { value: 100, message: "Máximo de 100 caracteres" },
                })}
              />
              {errors.descricao && <p className="error">{errors.descricao.message}</p>}
            </FloatingLabel>

            {/* QUANTIDADE + FORNECEDOR (NOVOS CAMPOS) */}
            <Row className="mb-5">
              <Col md={6}>
                <FloatingLabel controlId="FI-QUANTIDADE" label="Quantidade">
                  <Form.Control
                    type="number"
                    {...register("quantidade", {
                      required: "A quantidade é obrigatória",
                      min: { value: 1, message: "Deve ser maior que 0" },
                    })}
                  />
                  {errors.quantidade && (
                    <p className="error">{errors.quantidade.message}</p>
                  )}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="FI-FORNECEDOR" label="Fornecedor">
                  <Form.Control
                    type="text"
                    {...register("fornecedor", {
                      required: "O fornecedor é obrigatório",
                      minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                      maxLength: { value: 50, message: "Máximo de 50 caracteres" },
                    })}
                  />
                  {errors.fornecedor && (
                    <p className="error">{errors.fornecedor.message}</p>
                  )}
                </FloatingLabel>
              </Col>
            </Row>
            {/* FIM DOS NOVOS CAMPOS */}
          </Col>
        </Row>

        {/* Data Entrada e Tipo */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel controlId="FI-DATAENTRADA" label="Data Entrada">
              <Form.Control
                type="date"
                {...register("dataEntrada", {
                  required: "A data de entrada é obrigatória",
                })}
              />
              {errors.dataEntrada && (
                <p className="error">{errors.dataEntrada.message}</p>
              )}
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="FI-TIPOPRODUTO" label="Tipo do Produto">
              <Form.Select
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
                <p className="error">{errors.tipoProduto.message}</p>
              )}
            </FloatingLabel>
          </Col>
        </Row>

        {/* Validade e Valor */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel controlId="FI-DATAVALIDADE" label="Data Validade">
              <Form.Control
                type="date"
                {...register("dataValidade", {
                  required: "A data de validade é obrigatória",
                })}
              />
              {errors.dataValidade && (
                <p className="error">{errors.dataValidade.message}</p>
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
                  min: { value: 0.01, message: "Deve ser maior que 0" },
                })}
              />
              {errors.valor && <p className="error">{errors.valor.message}</p>}
            </FloatingLabel>
          </Col>
        </Row>

        {/* Botões */}
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: "#344250" }}>
            {props.page === "editar" ? "Atualizar" : "Cadastrar"}
          </Button>

          <Button
            type="button"
            variant="danger"
            className="mt-6 px-4"
            onClick={() => reset()}
          >
            Limpar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormularioProduto;
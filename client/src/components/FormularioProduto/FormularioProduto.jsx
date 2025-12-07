// Importação dos componentes do bootstrap
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

// Importando o hook de produtos
import { useInserirProduto, useAtualizarProduto } from "../../hooks/UseProdutos";
import { useMovimentacoesRecarga } from "../../hooks/useMovimentacoes";

const FormularioProduto = (props) => {
  const navigate = useNavigate();

  // FUNÇÕES DO HOOK DE PRODUTOS
  const { inserirProduto } = useInserirProduto();
  const { atualizarProduto } = useAtualizarProduto();

  // HOOK DO CONTEXTO DE MOVIMENTAÇÕES (localStorage)
  const { adicionarMovimentacao } = useMovimentacoesRecarga();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (props.page === "editar" && props.produto) {
      reset({
        nome: props.produto.nome || "",
        codigo: props.produto.codigo || "",
        descricao: props.produto.descricao || "",
        quantidade: props.produto.quantidade || "",
        fornecedor: props.produto.fornecedor || "",
        tipoProduto: props.produto.tipoProduto || "",
        dataEntrada: props.produto.dataEntrada || "",
        dataValidade: props.produto.dataValidade || "",
        valor: props.produto.valor || "",
      });
    }
  }, [props.page, props.produto, reset]);

  // SUBMIT
  const onSubmit = async (data) => {
    try {
      if (props.page === "cadastro") {
        // Inserir produto (assume-se que inserirProduto retorna uma Promise)
        await inserirProduto(data);

        // Adicionar movimentação localmente (localStorage via context)
        // Verifica se a função existe antes de chamar (evita erro)
        if (typeof adicionarMovimentacao === "function") {
          adicionarMovimentacao({
            tipo: "Entrada",
            produto: data.nome,
            data: new Date().toLocaleString(),
            quantidade: data.quantidade,
            valor: data.valor,
            detalhes: data.descricao || "",
          });
        } else {
          console.warn("adicionarMovimentacao não disponível no contexto de movimentações");
        }

        alert("Produto cadastrado com sucesso!");
        navigate("/produtos");
      } else if (props.page === "editar") {
        // Atualizar produto
        await atualizarProduto(data, props.produto.id);

        // Dependendo do comportamento desejado, não adicionamos movimentação ao editar.
        alert("Produto atualizado com sucesso!");
        navigate("/produtos");
      }
    } catch (err) {
      console.error("Erro no onSubmit:", err);
      alert("Ocorreu um erro ao salvar o produto. Veja o console.");
    }
  };

  // Caso tenha algum erro no formulário, mostra as mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}
        style={{ maxWidth: "720px", marginLeft: "200px" }}>
        <Form.Label as="h1" className="text-center mb-5 text-white">
          {props.page === "editar" ? "Editar Produto" : "Cadastrar Produto"}
        </Form.Label>
        <Row>
          <Col md={12} lg={12}>
            {/* Nome */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: { value: 2, message: "O nome deve ter pelo menos dois caracteres" },
                  maxLength: { value: 30, message: "O nome deve ter no máximo 30 caracteres" },
                })}
              />
              {errors.nome && <p className="error"> {errors.nome.message} </p>}
            </FloatingLabel>

            {/* Código */}
            <FloatingLabel controlId="FI-CODIGO" label="Código" className="mb-5">
              <Form.Control
                type="text"
                {...register("codigo", {
                  required: "O código é obrigatório",
                  minLength: { value: 2, message: "O código deve ter pelo menos dois caracteres" },
                  maxLength: { value: 10, message: "O código deve ter no máximo 10 caracteres" },
                })}
              />
              {errors.codigo && <p className="error"> {errors.codigo.message} </p>}
            </FloatingLabel>

            {/* Descrição */}
            <FloatingLabel controlId="FI-DESCRICAO" label="Descrição" className="mb-5">
              <Form.Control
                style={{ height: "120px", borderColor: "#5F6D7C" }}
                as="textarea"
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: { value: 2, message: "A descrição deve ter pelo menos dois caracteres" },
                  maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres" },
                })}
              />
              {errors.descricao && <p className="error"> {errors.descricao.message} </p>}
            </FloatingLabel>
          </Col>
        </Row>

        {/* Quantidade e Fornecedor */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel label="Quantidade">
              <Form.Control
                type="number"
                {...register("quantidade", {
                  required: "A quantidade é obrigatória",
                  min: { value: 1, message: "Mínimo 1 unidade" },
                })}
              />
              {errors.quantidade && <p className="error">{errors.quantidade.message}</p>}
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Fornecedor">
              <Form.Control
                type="text"
                {...register("fornecedor", {
                  required: "O fornecedor é obrigatório",
                  minLength: { value: 2, message: "Nome muito curto" },
                })}
              />
              {errors.fornecedor && <p className="error">{errors.fornecedor.message}</p>}
            </FloatingLabel>
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
              {errors.dataEntrada && <p>{errors.dataEntrada.message}</p>}
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
              {errors.tipoProduto && <p className="error"> {errors.tipoProduto.message} </p>}
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
                })}
              />
              {errors.dataValidade && <p className="error"> {errors.dataValidade.message} </p>}
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="FI-VALOR" label="Valor (R$)">
              <Form.Control
                type="number"
                step="0.01"
                {...register("valor", {
                  required: "O valor é obrigatório",
                  min: { value: 0.01, message: "O valor deve ser maior que 0" },
                })}
              />
              {errors.valor && <p className="error"> {errors.valor.message} </p>}
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

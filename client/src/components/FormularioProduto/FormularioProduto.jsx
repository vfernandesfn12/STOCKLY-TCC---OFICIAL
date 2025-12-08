import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useInserirProduto, useAtualizarProduto } from "../../hooks/UseProdutos";
import { useMovimentacoesRecarga } from "../../hooks/useMovimentacoes";

const FormularioProduto = (props) => {
  const navigate = useNavigate();

  const { inserirProduto } = useInserirProduto();
  const { atualizarProduto } = useAtualizarProduto();
  const { adicionarMovimentacao } = useMovimentacoesRecarga();

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

  const onSubmit = async (data) => {
    try {
      if (props.page === "cadastro") {
        await inserirProduto(data);

        adicionarMovimentacao({
          tipo: "Entrada",
          produto: data.nome,
          data: new Date().toISOString(),
          quantidade: data.quantidade,
          valor: data.valor,
          detalhes: data.descricao || "",
        });

        alert("Produto cadastrado com sucesso!");
        navigate("/produtos");
      } else {
        await atualizarProduto(data, props.produto.id);
        alert("Produto atualizado com sucesso!");
        navigate("/produtos");
      }
    } catch (err) {
      alert("Erro ao salvar produto.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "100%", maxWidth: "900px" , color: "white" }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            {props.page === "editar" ? "Editar Produto" : "Cadastrar Produto"}
          </h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Nome" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("nome", { required: "Obrigatório" })}
                  />
                  {errors.nome && <small className="text-danger">{errors.nome.message}</small>}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Código" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("codigo", { required: "Obrigatório" })}
                  />
                  {errors.codigo && <small className="text-danger">{errors.codigo.message}</small>}
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel label="Descrição" className="mb-3">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                {...register("descricao", { required: "Obrigatório" })}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao.message}</small>}
            </FloatingLabel>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Quantidade" className="mb-3">
                  <Form.Control
                    type="number"
                    {...register("quantidade", { required: "Obrigatório" })}
                  />
                  {errors.quantidade && <small className="text-danger">{errors.quantidade.message}</small>}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Fornecedor" className="mb-3">
                  <Form.Control
                    type="text"
                    {...register("fornecedor", { required: "Obrigatório" })}
                  />
                  {errors.fornecedor && <small className="text-danger">{errors.fornecedor.message}</small>}
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Data de Entrada" className="mb-3">
                  <Form.Control type="date" {...register("dataEntrada", { required: true })} />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Tipo do Produto" className="mb-3">
                  <Form.Select {...register("tipoProduto", { required: true })}>
                    <option value="">Selecione</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Comida">Comida</option>
                    <option value="Congelados">Congelados</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outro">Outro</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel label="Validade" className="mb-3">
                  <Form.Control type="date" {...register("dataValidade", { required: true })} />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Valor (R$)" className="mb-3">
                  <Form.Control type="number" step="0.01" {...register("valor", { required: true })} />
                </FloatingLabel>
              </Col>
            </Row>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button type="submit" size="lg">
                {props.page === "editar" ? "Atualizar" : "Cadastrar"}
              </Button>

              <Button variant="danger" size="lg" onClick={() => reset()}>
                Limpar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormularioProduto;
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useInserirProduto, useAtualizarProduto } from "../../hooks/UseProdutos";

const FormularioProduto = ({ page, produto }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // PREENCHE AUTOMATICAMENTE OS CAMPOS AO EDITAR
  useEffect(() => {
    if (page === "editar" && produto) {
      reset(produto);
    }
  }, [produto]);

  const { inserirProduto } = useInserirProduto();
  const { atualizarProduto } = useAtualizarProduto();

  const onSubmit = async (data) => {
    if (page === "cadastro") {
      await inserirProduto(data);
      alert("Produto cadastrado com sucesso!");
      reset();
    } else {
      await atualizarProduto(data, produto.id);
      alert("Produto atualizado com sucesso!");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md={6}>
          <FloatingLabel label="Nome do Produto">
            <Form.Control
              type="text"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <p className="error">{errors.nome.message}</p>}
          </FloatingLabel>
        </Col>

        <Col md={6}>
          <FloatingLabel label="Código do Produto">
            <Form.Control
              type="text"
              {...register("codigo", { required: "O código é obrigatório" })}
            />
            {errors.codigo && <p className="error">{errors.codigo.message}</p>}
          </FloatingLabel>
        </Col>
      </Row>

      {/* DESCRIÇÃO */}
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="Descrição">
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              {...register("descricao", { required: "A descrição é obrigatória" })}
            />
            {errors.descricao && <p className="error">{errors.descricao.message}</p>}
          </FloatingLabel>
        </Col>
      </Row>

      {/* CAMPOS NOVOS: QUANTIDADE E FORNECEDOR */}
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

      {/* DATAS E VALOR */}
      <Row className="mb-3">
        <Col md={4}>
          <FloatingLabel label="Data de Entrada">
            <Form.Control
              type="date"
              {...register("dataEntrada", { required: "Informe a data de entrada" })}
            />
            {errors.dataEntrada && (
              <p className="error">{errors.dataEntrada.message}</p>
            )}
          </FloatingLabel>
        </Col>

        <Col md={4}>
          <FloatingLabel label="Data de Validade">
            <Form.Control
              type="date"
              {...register("dataValidade", { required: "Informe a validade" })}
            />
            {errors.dataValidade && (
              <p className="error">{errors.dataValidade.message}</p>
            )}
          </FloatingLabel>
        </Col>

        <Col md={4}>
          <FloatingLabel label="Valor">
            <Form.Control
              type="number"
              step="0.01"
              {...register("valor", { required: "Informe o valor" })}
            />
            {errors.valor && <p className="error">{errors.valor.message}</p>}
          </FloatingLabel>
        </Col>
      </Row>

      {/* TIPO DO PRODUTO */}


      {/* FIM TIPO */}

      <div className="d-flex justify-content-center mt-4">
        <Button type="submit" variant="primary">
          {page === "editar" ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>
      </div>
    </Form>
  );
};

export default FormularioProduto;
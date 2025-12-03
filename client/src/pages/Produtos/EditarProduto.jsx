import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import FormularioProduto from "../../components/FormularioProduto/FormularioProduto.jsx";
import Container from "react-bootstrap/Container";

import { useBuscarProdutoPorId } from "../../hooks/UseProdutos";

const EditarProduto = () => {
  const { id } = useParams(); // pega o ID da URL
  const { buscarProdutoPorId } = useBuscarProdutoPorId();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function carregar() {
      const res = await buscarProdutoPorId(id);
      setProduto(res);
    }
    carregar();
  }, [id]);

  if (!produto) {
    return <p className="text-white">Carregando dados...</p>;
  }

  return (
    <Container>
      <FormularioProduto page="editar" produto={produto} />
    </Container>
  );
};

export default EditarProduto;

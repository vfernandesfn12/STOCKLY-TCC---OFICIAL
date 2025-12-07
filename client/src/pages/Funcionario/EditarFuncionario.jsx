import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario";
import { useBuscarFuncionarioPorId } from "../../hooks/UseFuncionarios";

const EditarFuncionario = () => {
  const { id } = useParams(); // pega o ID da URL
  const { buscarFuncionarioPorId } = useBuscarFuncionarioPorId();
  const [funcionario, setFuncionario] = useState(null);

  useEffect(() => {
    async function carregarFuncionario() {
      console.log("ID RECEBIDO NA URL:", id); // ✅ DEBUG 1

      const dados = await buscarFuncionarioPorId(id);

      console.log("FUNCIONÁRIO RETORNADO DA API:", dados); // ✅ DEBUG 2

      setFuncionario(dados);
    }

    carregarFuncionario();
  }, [id]);

  return (
    <div style={{ height: "93vh" }}>
      <Container>
        {funcionario && (
          <FormularioFuncionario
            page="editar"
            funcionario={funcionario}
          />
        )}
      </Container>
    </div>
  );
};

export default EditarFuncionario;
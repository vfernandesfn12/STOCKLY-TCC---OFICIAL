// importando components do bootstrap
import Container from "react-bootstrap/Container";

// Importando o componente de formulário
import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario";

const EditarFuncionario = () => {
  return (
    <div style={{ height: "93vh" }}>
      <Container>
        <FormularioFuncionario page="editar" />
      </Container>
    </div>
  );
};

export default EditarFuncionario;
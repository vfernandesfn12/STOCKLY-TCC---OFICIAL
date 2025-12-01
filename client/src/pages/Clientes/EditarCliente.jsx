// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente";

const EditarCliente = () => {

  return (
    <div style={{ height: "93vh" }}>
      <Container>
        <FormularioCliente page="editar" />
      </Container>
    </div>
  );
};

export default EditarCliente;
// Importando o componente de formulário
import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario.jsx";

// Importando o componente do bootstrap
import Container from "react-bootstrap/Container";

const CadastrarFuncionario = () => {
  return (
    <div>
      <Container>
        <FormularioFuncionario page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastrarFuncionario;
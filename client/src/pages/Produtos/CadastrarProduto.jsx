// Importando o componente formulário de produto
import FormularioProduto from '../../components/FormularioProduto/FormularioProduto'

// Importando o container do bootstrap
import { Container } from 'react-bootstrap'

const CadastrarProduto = () => {
  return (
    <div>
    <Container>
        
      <FormularioProduto page="cadastro"/>
    </Container>
    </div>
  )
}

export default CadastrarProduto

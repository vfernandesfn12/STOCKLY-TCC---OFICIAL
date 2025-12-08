import FormularioProduto from '../../components/FormularioProduto/FormularioProduto';
import { Container } from 'react-bootstrap';
import { useMovimentacoesRecarga } from '../../hooks/useMovimentacoes';

const CadastrarProduto = () => {
  const { fetchMovimentacoes } = useMovimentacoesRecarga();

  return (
    <div>
      <Container>
        <FormularioProduto 
          page="cadastro" 
          onSucesso={() => fetchMovimentacoes()} 
        />
      </Container>
    </div>
  );
};

export default CadastrarProduto;

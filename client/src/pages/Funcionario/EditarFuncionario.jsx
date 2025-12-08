import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const url = import.meta.env.VITE_API_URL;

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFuncionario() {
      try {
        const req = await fetch(`${url}/funcionarios/${id}`);
        if (!req.ok) throw new Error(`HTTP ${req.status}`);
        const res = await req.json();
        setFuncionario(res);
      } catch (erro) {
        console.error("Erro ao buscar funcionário:", erro);
        alert("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    }

    carregarFuncionario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${url}/funcionarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
      });

      alert("Funcionário atualizado com sucesso!");
      navigate("/funcionarios");
    } catch (erro) {
      console.error("Erro ao atualizar funcionário:", erro);
      alert("Erro ao atualizar funcionário");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Carregando usuário...</p>;
  }

  if (!funcionario) {
    return <p className="text-center text-danger">Usuário não encontrado.</p>;
  }

  return (
    <Container style={{ maxWidth: "600px", color: "#ffffffff" }}>
      <h2 className="text-center my-4 color:#ffffffff">Editar Funcionário</h2>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Nome" className="mb-4">
          <Form.Control
            type="text"
            name="nome_funcionario"
            value={funcionario.nome_funcionario || ""}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            value={funcionario.email || ""}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="CPF" className="mb-3">
          <Form.Control
            type="text"
            name="cpf"
            value={funcionario.cpf || ""}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel label="Telefone" className="mb-3">
          <Form.Control
            type="text"
            name="telefone"
            value={funcionario.telefone || ""}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel label="Departamento" className="mb-3">
          <Form.Control
            type="text"
            name="departamento"
            value={funcionario.departamento || ""}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel label="Cargo" className="mb-3">
          <Form.Control
            type="text"
            name="cargo"
            value={funcionario.cargo || ""}
            onChange={handleChange}
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" size="lg">
            Atualizar Funcionário
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarUsuario;
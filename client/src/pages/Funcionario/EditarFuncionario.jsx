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

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const req = await fetch(`${url}/usuarios/${Number(id)}`);
        const res = await req.json();
        setUsuario(res);
      } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        alert("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    }

    carregarUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${url}/usuarios/${Number(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      alert("Perfil atualizado com sucesso!");
      navigate("/home");
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar perfil");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Carregando usuário...</p>;
  }

  if (!usuario) {
    return <p className="text-center text-danger">Usuário não encontrado.</p>;
  }

  return (
    <Container style={{ maxWidth: "600px", color: "#ffffffff" }}>
      <h2 className="text-center my-4 color:#ffffffff">Editar Meu Perfil</h2>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Nome" className="mb-4">
          <Form.Control
            type="text"
            name="nome"
            value={usuario.nome || ""}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            value={usuario.email || ""}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Senha" className="mb-3">
          <Form.Control
            type="password"
            name="senha"
            value={usuario.senha || ""}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" size="lg">
            Atualizar Perfil
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarUsuario;
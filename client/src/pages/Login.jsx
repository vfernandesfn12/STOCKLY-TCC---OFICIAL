//Importação dos componentes do bootstrap
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";

// importando o hook para verificar o login, vindo do useUsuários
import { useVerificaLogin } from "../hooks/useUsuarios";

// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

//Importando o useState para tratar de variáveis
import { useEffect, useState } from "react";

// importação do Navigate para transitar entre as paginas
import { useNavigate } from "react-router-dom";

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";

const Login = () => {
  // Usa as variáveis de contexto do usuário
  const { logout } = useContext(AuthContext);

  //Assim que entrar na página, o localStorage é resetado
  useEffect(() => {
    logout();
  }, []);

  //register = cria um objeto com os valores retirados dos inputs
  //handleSubmit = envia os dados formulário, caso dê erro ou sucesso
  //formState { erros } = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Variável classes do Alert
  const [alertaClasse, setAlertaClasse] = useState("d-none");

  //Usando apenas a função verificaLogin, que importei do hook
  const { verificaLogin } = useVerificaLogin();

  //Criando o navigate
  const navigate = useNavigate();

  //Caso o envio dê certo
  // data = objeto com todas as informações preenchidas nos campos do formulário
  const onSubmit = (data) => {
    console.log("Dados enviados:", data);

    //Cria uma variável para armazenar a resposta completa que veio da função
    const resposta = verificaLogin(data);

    //Caso a resposta seja positiva mostra o alerta e leva ele pra home
    if (resposta === "Login efetuado com sucesso") {
      alert(resposta);
      navigate("/home");
    }
    //Se não, avisa o alerta lá
    else {
      setAlertaClasse("my-3 w-75 mx-auto");
    }
  };

  //Caso o envio dê errado
  //errors = objeto com todos os erros do envio
  const onError = (errors) => {
    console.log("Errors:", errors);
  };

  return (
    <div className={styles.pagelogin}>
      <Container className="justify-content-center align-content-center min-vh-100">
        {/* Linha para os campos de login e icone */}
        <Row>
          {/* Coluna com o icone da página */}
          <Col>
            {/* Icone de Login */}
            {/* <BsBoxArrowInRight style={{ fontSize: "500px", color: "white" }} /> */}
            <img src={logo} alt="" width={"600px"} height={"600px"} />
          </Col>
          {/* Coluna com os campos de login */}
          <Col className="d-flex flex-column">
            <Form className={styles.formlogin}
              style={{ width: "75%", margin: "auto", textAlign: "center" }}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              {/* alteração feita para adicionar texto na caixa de login */}

              <h2 className={styles.tituloLogin}>Login</h2>
              {/* Caixinha de email */}
              <FloatingLabel
                controlId="inputEmail"
                label="Email"
                className="mb-5"
              >
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "Email inválido",
                    },
                    validate: (value) =>
                      value.includes("@") || "Email deve possuir um @",
                  })}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </FloatingLabel>
              {/* Fim de caixinha de email */}

              {/* Fim de senha */}
              <FloatingLabel
                controlId="inputSenha"
                label="Senha"
                className="mb-5"
              >
                <Form.Control
                  type="password"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                  })}
                />
                {errors.senha && (
                  <p className="error">{errors.senha.message}</p>
                )}
              </FloatingLabel>
              {/* Fim da senha */}

              {/* Botão para envio */}
              <Button
                style={{ backgroundColor: "#344250" }}
                variant="primary"
                type="submit"
                className="mb-4"
                size="lg"
              >
                Login
              </Button>

              {/* Alerta, caso aja algum erro */}
              <Alert variant="danger" className={alertaClasse}>
                Usuário ou senha inválidos
              </Alert>

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

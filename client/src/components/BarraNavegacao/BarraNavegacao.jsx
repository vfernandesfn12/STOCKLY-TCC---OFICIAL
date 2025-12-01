// Importando o css da barra de navegação
import styles from "./BarraNavegacao.module.css";

import logo from "../../assets/logo.png";
// Importar os componentes do bootstrap
import { Nav, Navbar, NavDropdown, Image, Accordion } from "react-bootstrap";

// Importando os links do router
import { NavLink } from "react-router-dom";

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

// Importanto os icones
import { BsBoxes } from "react-icons/bs";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaAtomSolid } from "react-icons/lia";
import { HiUserGroup } from "react-icons/hi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { FaBoxesStacked } from "react-icons/fa6";
import { HiMiniDocumentText } from "react-icons/hi2";
import { RiHome9Fill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const BarraNavegacao = () => {
  // importar o nome de usuario logado e funcao logout
  const { usuarioNome, logout } = useContext(AuthContext);

  // Guarda o id do usuário atual
  const idAtual = localStorage.getItem("id");

  // Guarda a imagem do usuário atual
  const imagemAtual = localStorage.getItem("imagemPerfil");

  // Imagem padrão
  const semImagem = "https://cdn-icons-png.flaticon.com/512/17/17004.png";
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100 max-vh-100"
      style={{ width: "250px" }}
    >
      {/* Logo da empresa */}
      <Navbar.Brand as={NavLink} to="/home" className="text-white mb-3">
        <img className="fs-4" src={logo} style={{ width: "50px", height: "50px" }}/>
        <span className="fs-5 ms-2">STOCKLY</span>
      </Navbar.Brand>

      {/* Opções de menu */}
      <Nav className="flex-column mb-auto">
        {/* Opção home */}
        <Nav.Link as={NavLink} to="/home" className="text-white px-2">
          <RiHome9Fill className="fs-4" />
          <span className="fs-5 ms-2">Home</span>
        </Nav.Link>

        {/* Opção Relatórios */}
        <Nav.Link as={NavLink} to="/relatorios" className="text-white px-2">
          <HiMiniDocumentText className="fs-4" />
          <span className="fs-5 ms-2">Relatórios</span>
        </Nav.Link>

        {/* Criando o arcordeon */}
        <Accordion flush className="flex-column mb-auto" alwaysOpen>
          {/* Páginas produtos */}
          <Accordion.Item eventKey="0" className="bg-dark text-white">
            <Accordion.Header className={styles.accordionHeader}>
              <FaBoxesStacked className="fs-4" />
              <span className="ms-2 fs-5"> Produtos </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-dark ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos"
                  className="text-white ps-4"
                >
                  <BsBoxes className="fs-5" />
                  <span className="ms-2 fs-5"> Estoque </span>
                </Nav.Link>

                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos/cadastrar"
                  className="text-white ps-4"
                >
                  <AiOutlinePlus className="fs-5" />
                  <span className="ms-2 fs-5"> Adicionar </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim produtos */}

          {/* Páginas Clientes */}
          <Accordion.Item eventKey="1" className="bg-dark text-white">
            <Accordion.Header className={styles.accordionHeader}>
              <FaHandHoldingUsd className="fs-4" />
              <span className="ms-2 fs-5"> Fornecedores </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-dark ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/clientes"
                  className="text-white ps-4"
                >
                  <HiMiniClipboardDocumentList className="fs-5" />
                  <span className="ms-2 fs-5"> Listar </span>
                </Nav.Link>

                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/clientes/cadastrar"
                  className="text-white ps-4"
                >
                  <AiOutlinePlus className="fs-5" />
                  <span className="ms-2 fs-5"> Adicionar </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim clientes */}

          {/* Páginas Func */}
          <Accordion.Item eventKey="2" className="bg-dark text-white">
            <Accordion.Header className={styles.accordionHeader}>
              <HiUserGroup className="fs-4" />
              <span className="ms-2 fs-5"> Funcionários </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-dark ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/funcionarios"
                  className="text-white ps-4"
                >
                  <HiMiniClipboardDocumentList className="fs-5" />
                  <span className="ms-2 fs-5"> Listar </span>
                </Nav.Link>

                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/funcionarios/cadastrar"
                  className="text-white ps-4"
                >
                  <AiOutlinePlus className="fs-5" />
                  <span className="ms-2 fs-5"> Adicionar </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim Func */}

        </Accordion>
      </Nav>

      <hr className="border-secondary" />

      <Nav className="dropdown pb-4">
        <NavDropdown
          title={
            <span className="text-white align-items-center">
              <Image
                src={imagemAtual == "null" ? semImagem : imagemAtual}
                width={50}
                height={50}
                roundedCircle
                className="me-2 fs-5"
              />
              {usuarioNome}
            </span>
          }
          menuVariant="dark"
        >
          {/* Editar perfil  */}
          <NavDropdown.Item as={NavLink} to={`/funcionarios/editar/${idAtual}`}>
            Editar
          </NavDropdown.Item>

          {/* Voltar Login  */}
          <NavDropdown.Item as={NavLink} to="/login" onClick={logout}>
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default BarraNavegacao;

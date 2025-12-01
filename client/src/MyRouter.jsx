import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import PaginaErro from "./pages/PaginaErro.jsx";
import Login from "./pages/Login.jsx";
import RotasProtegidas from "./pages/RotasProtegidas.jsx";
import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";

// Páginas de produto
import VerProdutos from "./pages/Produtos/VerProdutos.jsx";
import CadastrarProduto from "./pages/Produtos/CadastrarProduto.jsx";
import EditarProduto from "./pages/Produtos/EditarProduto.jsx";

// Páginas de funcionário
import VerFuncionarios from "./pages/Funcionario/VerFuncionarios.jsx";
import CadastrarFuncionario from "./pages/Funcionario/CadastrarFuncionario.jsx";
import EditarFuncionario from "./pages/Funcionario/EditarFuncionario.jsx";

// Páginas cliente
import CadastrarCliente from "./pages/Clientes/CadastrarCliente.jsx";
import EditarCliente from "./pages/Clientes/EditarCliente.jsx";
import VerClientes from "./pages/Clientes/VerClientes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
    ],
  },
  {
    path: "/",
    element: <RotasProtegidas />,
    errorElement: <PaginaErro />,
    children: [
      { path: "home", element: <Home /> },

      // Rotas de produtos
      {
        path: "produtos",
        children: [
          { index: true, element: <VerProdutos /> },
          { path: "cadastrar", element: <CadastrarProduto /> },
          { path: "editar/:id", element: <EditarProduto /> },
        ],
      },

      // Rotas de funcionários
      {
        path: "funcionarios",
        children: [
          { index: true, element: <VerFuncionarios /> },
          { path: "cadastrar", element: <CadastrarFuncionario /> },
          { path: "editar/:id", element: <EditarFuncionario /> },
        ],
      },
      {
        path: "clientes",
        children: [
          {
            index: true,
            element: <VerClientes />,
          },
          {
            path: "cadastrar",
            element: <CadastrarCliente />,
          },
          {
            path: "editar/:id",
            element: <EditarCliente />,
          },
        ],
      },
    ],
  },
]);

export default router;

import "./App.css";
//Importando o outlet, do rea
import { Outlet } from "react-router-dom";

//Importação dos componentes do bootstrap
import Container from "react-bootstrap/Container";
function App() {
  return (
    <>
      <div className="App d-flex">
        <Container className="text-center">
          <Outlet />
        </Container>
      </div>
    </>
  );
}

export default App;

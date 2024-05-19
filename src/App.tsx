import "./App.css";
import Navbar from "./components/layout/navbar-web";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/content";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Content>
          <AppRoutes />
        </Content>
      </BrowserRouter>
  );
}

export default App;

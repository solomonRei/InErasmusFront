import { ThemeProvider } from "@/components/ui/theme-provider";
import "./App.css";
import Navbar from "./components/layout/navbar-web";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/content";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar />
        <Content>
          <AppRoutes />
        </Content>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

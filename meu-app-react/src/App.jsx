import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Menu /> 
        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/listagem" element={<Listagem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
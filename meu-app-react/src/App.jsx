import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

export default function App() {
  return (
    <BrowserRouter>
      {/* O Menu fica fora das Routes para aparecer em todas as páginas */}
      <Menu /> 
      
      <main style={{ padding: '0 10px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
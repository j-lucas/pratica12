import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div>
      <h1>Sistema de Cadastro de Desenvolvedores</h1>
      <p>Bem-vindo ao trabalho de Tecnologias Web! Use o menu ou os cards para navegar.</p>

      {/* Como não temos a imagem local pronta no mesmo caminho, podemos usar um emoji ou imagem genérica */}
      <div style={{ fontSize: '100px', textAlign: 'center', margin: '40px 0' }}>
        💻
      </div>

      <div className="cards-home">
        <Link to="/cadastro" className="card">
          <h3>➕ Cadastre Usuários</h3>
          <p>Adicione novos registros ao sistema.</p>
        </Link>

        <Link to="/listagem" className="card">
          <h3>📋 Gerencie</h3>
          <p>Visualize os desenvolvedores cadastrados.</p>
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
        <li>
          <Link to="/listagem">Listagem</Link>
        </li>
      </ul>
    </nav>
  );
}
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Listagem() {
  const { users, loading } = useContext(AppContext);

  return (
    <div>
      <h1>Listagem de Desenvolvedores</h1>
      
      {loading ? (
        <p className="text-center">Carregando dados da API...</p>
      ) : (
        <div className="lista-container">
          {users.length === 0 ? (
            <p className="text-center">Nenhum registro encontrado.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className={`item-lista ${user.source === 'local' ? 'novo-item' : ''}`}>
                <h3>{user.name} {user.source === 'local' && '(Novo)'}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Cargo:</strong> {user.role}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
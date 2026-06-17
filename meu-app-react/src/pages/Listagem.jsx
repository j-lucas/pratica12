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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <img 
                    src={user.avatar} 
                    alt={`Avatar de ${user.name}`} 
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #334155' }}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>{user.name} {user.source === 'local' && '(Novo)'}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#818cf8' }}>{user.role}</p>
                  </div>
                </div>
                <p style={{ marginTop: '0.5rem' }}><strong>Email:</strong> {user.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
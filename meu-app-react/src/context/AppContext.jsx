import { createContext, useState, useEffect } from 'react';

// Criação do Contexto
export const AppContext = createContext();

// Componente Provider que vai envolver a aplicação
export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca inicial dos dados (simulando integração com API REST)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Vamos formatar um pouco os dados para o nosso caso de uso e pegar apenas 5
        const formattedUsers = data.slice(0, 5).map(user => ({
          id: user.id.toString(), // Converter para string para padronizar com IDs gerados localmente (UUID seria ideal)
          name: user.name,
          email: user.email,
          role: 'Desenvolvedor(a)', // Campo não existente na API adicionado para enriquecer o visual
          source: 'api' // Marcador para saber que veio da API
        }));
        
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Função para adicionar um novo usuário ao estado global
  const addUser = (newUser) => {
    // Adiciona o novo usuário no início da lista para visualização imediata
    setUsers((prevUsers) => [
      {
        ...newUser,
        id: Date.now().toString(), // Simula um ID único
        source: 'local' // Marcador para saber que foi cadastrado localmente
      },
      ...prevUsers
    ]);
  };

  return (
    <AppContext.Provider value={{ users, loading, addUser }}>
      {children}
    </AppContext.Provider>
  );
}

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
        
        // Nomes brasileiros genéricos para substituir os em inglês da API
        const nomesBrasileiros = [
          { name: "João Silva", email: "joao.silva@email.com" },
          { name: "Maria Oliveira", email: "maria.oliveira@email.com" },
          { name: "Carlos Eduardo", email: "carlos.edu@email.com" },
          { name: "Ana Costa", email: "ana.costa@email.com" },
          { name: "Pedro Santos", email: "pedro.santos@email.com" }
        ];

        // Vamos formatar os dados para o nosso caso de uso, pegando 5 usuários
        // e substituindo os nomes e emails pelos brasileiros definidos acima
        const formattedUsers = data.slice(0, 5).map((user, index) => ({
          id: user.id.toString(),
          name: nomesBrasileiros[index]?.name || user.name,
          email: nomesBrasileiros[index]?.email || user.email,
          role: 'Desenvolvedor(a)',
          source: 'api'
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

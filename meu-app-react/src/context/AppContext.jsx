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
        // API pública que permite buscar usuários do Brasil nativamente
        const response = await fetch('https://randomuser.me/api/?results=5&nat=BR');
        const data = await response.json();
        
        // Formatando a resposta da API para o padrão do nosso sistema
        const formattedUsers = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          role: 'Desenvolvedor(a)', // Campo não existente na API adicionado para padronização
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

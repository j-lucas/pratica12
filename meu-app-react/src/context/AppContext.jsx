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
        const response = await fetch('https://randomuser.me/api/?results=5&nat=BR');
        const data = await response.json();
        
        // Formatando a resposta da API incluindo a FOTO do perfil
        const formattedUsers = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          role: 'Desenvolvedor(a) Sênior', 
          avatar: user.picture.medium, // Pega a foto real da API
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
    setUsers((prevUsers) => [
      {
        ...newUser,
        id: Date.now().toString(),
        // Usa uma API pública gratuita para gerar um avatar com as iniciais do nome cadastrado
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=4f46e5&color=fff&size=128`,
        source: 'local' 
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

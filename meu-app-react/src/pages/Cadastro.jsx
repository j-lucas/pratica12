import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const { addUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'O cargo/função é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      addUser(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', role: '' });
      
      setTimeout(() => {
        navigate('/listagem');
      }, 1500);
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Usuário</h2>
      <p>Preencha os dados abaixo. Todos os campos são obrigatórios.</p>
      
      {success && (
        <div className="alert alert-success">
          Usuário cadastrado com sucesso! Redirecionando...
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            className={errors.name ? "input-error" : ""}
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className={errors.email ? "input-error" : ""}
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Cargo / Função</label>
          <input
            type="text"
            id="role"
            name="role"
            className={errors.role ? "input-error" : ""}
            value={formData.role}
            onChange={handleChange}
            placeholder="Ex: Desenvolvedor"
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <button type="submit" disabled={success}>
          {success ? 'Aguarde...' : 'Salvar Cadastro'}
        </button>
      </form>
    </div>
  );
}
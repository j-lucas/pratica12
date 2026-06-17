import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <nav>
      <div className="sidebar-title">Menu Principal</div>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "active" : ""}
        end
      >
        Início
      </NavLink>
      <NavLink 
        to="/cadastro" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Cadastro
      </NavLink>
      <NavLink 
        to="/listagem" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Listagem
      </NavLink>
    </nav>
  );
}
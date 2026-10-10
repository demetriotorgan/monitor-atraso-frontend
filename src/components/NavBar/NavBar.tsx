
import { NavLink } from 'react-router'
import {
  House,
  ClipboardList,
  UserRoundPlus,
  Settings,
} from 'lucide-react'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? 'bottom-nav-link-active' : ''}`
        }
      >
        <House size={22} strokeWidth={2} />
        <span>Início</span>
      </NavLink>

      <NavLink
        to="/atrasos/novo"
        end
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? 'bottom-nav-link-active' : ''}`
        }
      >
        <ClipboardList size={22} strokeWidth={2} />
        <span>Novo Atraso</span>
      </NavLink>

      <NavLink
        to="/atrasos"
        end
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? 'bottom-nav-link-active' : ''}`
        }
      >
        <UserRoundPlus size={22} strokeWidth={2} />
        <span>Listar atrasos</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? 'bottom-nav-link-active' : ''}`
        }
      >
        <Settings size={22} strokeWidth={2} />
        <span>Settings</span>
      </NavLink>
    </nav>
  )
}

export default NavBar

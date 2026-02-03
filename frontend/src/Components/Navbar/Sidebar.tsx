import { NavLink } from "react-router-dom";
import { SidebarData } from "./NavbarData.ts";
import "./Navbar.css";

export default function Sidebar() {

  return (
    <div className="admin-sidebar">
      <h3 className="sidebar-title">Admin</h3>

      <ul className="sidebar-menu">
        {SidebarData.map((item, index) => (
          <li key={index} className="sidebar-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

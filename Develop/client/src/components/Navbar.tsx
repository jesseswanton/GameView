import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-title">
        <NavLink to="/" className="nav-logo">
          <h2>GameView</h2>
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      {isLoggedIn && <NavLink to="/">Home</NavLink>}
      {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}

      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
      {!isLoggedIn && <NavLink to="/signup">Sign Up</NavLink>}

      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;

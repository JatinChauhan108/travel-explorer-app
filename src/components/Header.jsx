import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkClass =
    "px-4 py-2 rounded-lg font-medium transition duration-300";
  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass =
    "text-gray-300 hover:text-white hover:bg-gray-700";

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <header className="bg-gray-900 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <h1 className="text-xl font-bold text-white tracking-wide">
          🌍 Travel Explorer
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6 items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Favorites
          </NavLink>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Login / Signup
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;


import { NavLink } from "react-router-dom";

const Header = () => {
  const linkClass =
    "px-4 py-2 rounded-lg font-medium transition duration-300";
  const activeClass =
    "bg-blue-600 text-white shadow-md";
  const inactiveClass =
    "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <header className="bg-gray-900 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <h1 className="text-xl font-bold text-white tracking-wide">
          🌍 Travel Explorer
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
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
        </nav>
      </div>
    </header>
  );
};

export default Header;

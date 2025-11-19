import { Leaf, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { scrollToSection } from "../../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 border-b border-gray-200 bg-white shadow-sm px-6 md:px-10 py-8 flex justify-between items-center z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <Leaf className="text-emerald-600 w-6 h-6" />
        <h1 className="text-emerald-600 text-xl md:text-2xl font-bold">
          Evergreen College
        </h1>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-8 font-semibold text-emerald-600 text-lg">
        <li
          className="cursor-pointer hover:opacity-70 transition-colors"
          onClick={() => {
            if(pathname === '/courses'){
              navigate('/')
              return;
            }
            scrollToSection('home')
          }}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:opacity-70 transition-colors"
          onClick={() => (window.location.href = "/courses")}
        >
          Courses
        </li>
        <li
          className="cursor-pointer hover:opacity-70 transition-colors"
          onClick={() => {
            if(pathname === '/courses'){
              navigate('/')
              return;
            }
            scrollToSection('about')
          }}
        >
          About
        </li>
      </ul>

      {/* Right side (user + login) */}
      <div className="hidden lg:flex space-x-2 items-center font-medium">
        <User className="bg-emerald-600 text-white p-3 w-12 h-12 rounded-full" />
        <a
          href="/login"
          className="text-lg text-emerald-600 hover:opacity-70 transition-colors"
        >
          Log In
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-emerald-600 focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu (slide-down) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md lg:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6 text-emerald-600 font-semibold text-lg">
            <li
              className="cursor-pointer hover:opacity-70 transition-colors"
              onClick={() => {
                scrollToSection("home");
                closeMenu();
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:opacity-70 transition-colors"
              onClick={() => {
                window.location.href = "/courses";
                closeMenu();
              }}
            >
              Courses
            </li>
            <li
              className="cursor-pointer hover:opacity-70 transition-colors"
              onClick={() => {
                scrollToSection("about");
                closeMenu();
              }}
            >
              About
            </li>
            <li
              className="cursor-pointer hover:opacity-70 transition-colors"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

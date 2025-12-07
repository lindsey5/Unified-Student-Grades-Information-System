import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { scrollToSection } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    {
      label: "Home",
      onClick: () => {
        if (pathname !== "/") {
          navigate("/", { state: { scrollTo: "home" } });
        } else {
          scrollToSection("home");
        }
      },
    },
    {
      label: "About",
      onClick: () => {
        if (pathname !== "/") {
          navigate("/", { state: { scrollTo: "about" } });
        } else {
          scrollToSection("about");
        }
      },
    },
  ];

  return (
    <>
      <nav className="text-white fixed inset-x-0 top-0 bg-red-600 shadow-md z-50 border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" className="w-20 h-20" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  TCU
                </h1>
                <p className="text-xs font-medium">
                  Taguig City University
                </p>
              </div>
            </a>

            {/* Desktop Login */}
            <div className="hidden lg:flex items-center gap-3">
              <ul className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.onClick}
                      className="cursor-pointer px-5 py-2.5 text-white font-semibold rounded-lg hover:bg-red-50 hover:text-red-800 transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <a
                href="/login"
                className="border border-white flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <User size={18} />
                <span>Log In</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-white hover:bg-red-500 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-red-50 to-white border-t border-red-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        item.onClick();
                        closeMenu();
                      }}
                      className="cursor-pointer w-full text-left px-4 py-3 text-red-700 font-semibold rounded-lg hover:bg-red-200 hover:shadow-sm transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-4 border-t border-red-200">
                  <a
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 shadow-md transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <User size={18} />
                    <span>Log In</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { BookOpen, LogOutIcon, ShieldAlert, Menu, X, Trophy, Leaf } from "lucide-react";
import { logout } from "../../utils/auth";
import { NavigationButton } from "../Button";

const StudentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-emerald-700 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
          <a href="/student" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white text-xl font-bold tracking-tight">
                Evergreen College
              </h1>
              <p className="text-emerald-100 text-sm font-medium">
                Unified Student Grades Information System
              </p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-emerald-700 text-lg font-bold">Evergreen</h1>
            </div>
          </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavigationButton icon={<BookOpen size={20} />} label="Your Grades" to="/student" />
              <NavigationButton icon={<Trophy size={20} />} label="Ranking" to="/student/ranking" />
              <NavigationButton icon={<ShieldAlert size={20} />} label="Security" to="/student/security" />
              
              <div className="mx-2 h-8 w-px bg-emerald-500"></div>
              
              <span className="text-sm font-medium bg-emerald-600 px-3 py-1.5 rounded-full text-white shadow-sm">
                Student
              </span>
              
              <button
                className="hover:bg-emerald-800 flex items-center gap-2 py-2 px-4 rounded-lg transition cursor-pointer ml-2"
                onClick={async () => await logout()}
              >
                <LogOutIcon size={20} />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-emerald-800 rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-emerald-800 border-t border-emerald-600">
            <nav className="px-4 py-4 space-y-2">
              <div className="mb-3 pb-3 border-b border-emerald-600">
                <span className="text-sm font-medium bg-emerald-600 px-3 py-1.5 rounded-full text-white shadow-sm inline-block">
                  Student
                </span>
              </div>
              
              <NavigationButton icon={<BookOpen size={20} />} label="Your Grades" to="/student" />
              <NavigationButton icon={<Trophy size={20} />} label="Ranking" to="/student/ranking" />
              <NavigationButton icon={<ShieldAlert size={20} />} label="Security" to="/student/security" />
              
              <button
                className="hover:bg-emerald-900 flex items-center gap-3 py-2.5 px-3 rounded-lg transition cursor-pointer w-full mt-4"
                onClick={async () => await logout()}
              >
                <LogOutIcon size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default StudentHeader;
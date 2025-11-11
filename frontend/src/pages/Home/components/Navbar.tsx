import { Leaf, User } from "lucide-react";
import { scrollToSection } from "../../../utils/utils";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 border-b border-gray-200 shadow-b-lg bg-white px-5 py-2 md:px-20 md:py-5 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <Leaf className="text-emerald-600 w-6 h-6" />
        <h1 className="text-emerald-600 text-2xl font-bold">Evergreen College</h1>
      </div>
      <ul className="flex space-x-8 font-semibold text-emerald-600 text-lg">
        <li 
            className="cursor-pointer hover:opacity-70 transition-colors"
            onClick={() => scrollToSection('home')}
        >
          Home
        </li>
        <li 
            className="cursor-pointer hover:opacity-70 transition-colors"
            onClick={() => scrollToSection('courses')}
        >
          Courses
        </li>
        <li 
            className="cursor-pointer hover:opacity-70 transition-colors"
            onClick={() => scrollToSection('about')}
        >
          About
        </li>
      </ul>
      <div className="flex space-x-2 items-center font-medium">
        <User className="bg-emerald-600 text-white p-3 w-12 h-12 rounded-full"/>
        <a href="/login" className="text-lg text-emerald-600 hover:opacity-70 transition-colors">Log In</a>
      </div>
    </nav>
  );
};

export default Navbar;
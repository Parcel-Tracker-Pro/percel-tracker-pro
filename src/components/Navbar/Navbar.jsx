import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import logo from "./../../assets/image/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white">
      <div className="container mx-auto flex items-center justify-between p-5">
        {/* Logo */}
        <Link to="/" className="">
          <img src={logo} alt="Logo" className="w-24" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Language Selector and Button */}
        <div className="hidden md:flex items-center space-x-2">
          {/* <span className="text-gray-800">MYA / EN</span> */}
          <a
            href="https://m.me/197568866770556?source=qr_link_share"
            className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-500"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-green-900 focus:outline-none"
          >
            {isOpen ? (
              <IoClose size={20} className="text-green-900" />
            ) : (
              <IoMenuSharp size={20} className="text-green-900" />
            )}{" "}
            {/* Hamburger or Close icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-blue-500">
          <div className="flex flex-col space-y-4 px-4 py-10 absolute w-full z-10 bg-slate-200">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                  : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                  : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/service"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                  : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg font-semibold text-gray-800 hover:text-green-600"
                  : "text-black text-lg font-semibold text-gray-800 hover:text-green-600"
              }
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="ml-3 text-xl font-semibold text-gray-900">
              Logo
            </span>
          </div>

          <nav className="flex space-x-4">
            <Link
              href={"/"}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href={"/ofertas"}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              Ofertas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

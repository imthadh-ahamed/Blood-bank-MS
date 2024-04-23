// Importing neccessary components and packages
import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

// Header component definition
function Header() {
  return (
// Navbar component
    <Navbar
      className="border-b-2"
      style={{ display: "flex", alignItems: "center" }}
    >
{/* Import the Web application Logo */}
      <Link to="/">
        <img
          className="selfcenter p-3"
          src="./images/logo.png"
          alt="App Logo"
          style={{ width: "140px", height: "auto" }}
        />
      </Link>
{/* Donor Management Header */}
      <div
        className="selfcenter text-xs sm:text-2xl font-bold min-w-max bg-gradient-to-r from-customRed via-customlightRed to-customApricot rounded-xl flex-grow"
        style={{ marginLeft: "auto", marginRight: "20px", textAlign: "center" }}
      >
        <h1 className="py-3 dark:text-white">Donor Management</h1>
      </div>
      <div className="flex gap-2 items-center">
{/* User profile direction button */}
        <Link to="/profile">
          <div className="p-3 flex items-center border-2 border-customRed rounded-xl min-w-max mr-3">
            <FaRegUserCircle className="w-6 h-6 mr-3" />
            <h4 className="text-xs sm:text-sm font-semibold"> User Name </h4>
          </div>
        </Link>
      </div>
    </Navbar>
  );
}

// Exporting Header component
export default Header;

import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { Link } from "react-router-dom";


function Donordashboard() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
        <Link to={'/viewblogs'}>
          View Blogs        
        </Link>


        <Link to={'/viewdonors'}>
          View donors        
        </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donordashboard;

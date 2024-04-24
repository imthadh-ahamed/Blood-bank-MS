import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector } from 'react-redux';

function Viewblogs() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          {/* View Blogs Text */}
          <div className="text-center text-4xl font-bold">
            <h1>View Blogs</h1>
          </div>

          {/* Search and Add blog button line */}
          <div className="flex flex-row justify-between">
            {/* Search bar */}
            <div className="mb-4">Search Bar</div>

            {/* Conditional rendering of Add Blogs button */}
            {currentUser.isAdmin && (
              <div>
                <Link to="/Addblogs">
                  <Button
                    type="submit"
                    className="border-2 border-customRed rounded-xl font-semibold px-2 py-1 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Add Blogs
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewblogs;

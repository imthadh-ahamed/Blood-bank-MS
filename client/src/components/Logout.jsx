import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Confirm Logout</h2>
        </div>
        <p className="text-gray-700 mb-6">
          <div> Are you sure you want to logout? </div>
          <div> You will be redirected to the login page. </div>
        </p>
        <div className="flex justify-end">
          <Link to={"/"}>
            <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
              Logout
            </button>
          </Link>
          <Link to={"/donordashboard"}>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
              Dismiss
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;

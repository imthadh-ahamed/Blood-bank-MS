import React from "react";
import { Link } from "react-router-dom";

function PostSuccess() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your blog is successfully posted!</h2>
        </div>
        
        <div className="flex justify-end">
          <Link to={"/create-post"}>
            <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
              Add Blog
            </button>
          </Link>
          <Link to={"/viewblogs"}>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
              View Blogs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostSuccess;

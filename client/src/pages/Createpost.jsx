import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Createpost() {
  // State variables for form fields and error handling
  const [blogid, setBlogID] = useState(""); // State for blog ID
  const [userid, setUserID] = useState(""); // State for user ID
  const [title, setTitle] = useState(""); // State for title
  const [date, setDate] = useState(""); // State for date
  const [content, setContent] = useState(""); // State for content
  const [publishError, setPublishError] = useState(null); // State for publish
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Sending a POST request to backend API endpoint
      const response = await fetch("/api/post/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogid, userid, title, date, content }), // Sending form data as JSON
      });

      const data = await response.json();

      if (data.success) {
        console.log("Post created successfully");
        navigate("/viewblogs"); // Redirect to view blogs page after successful creation
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBlogID("");
      setTitle("");
      setDate("");
      setContent("");
    }
  };

  return (
    <div>
      <Header /> {/* Header component */}
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar /> {/* Sidebar component */}
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          {/* Heading of the page */}
          <h1 className="text-center text-3xl font-semibold mb-4">Add Blogs</h1>
          {/* Form for adding blogs */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {/* Blog ID */}
              <label htmlFor="blogid" className="block text-gray-700">
                Blog ID
              </label>
              <input
                type="number"
                id="blogid"
                placeholder="1"
                name="blogid"
                value={blogid}
                onChange={(e) => setBlogID(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* User ID */}
            <div className="mb-4">
              <label htmlFor="userid" className="block text-gray-700">
                User ID
              </label>
              <input
                type="text"
                id="userid"
                placeholder="Admin Name"
                name="userid"
                value={userid}
                onChange={(e) => setUserID(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                placeholder="Date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write Something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Create Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                class="w-full h-40 flex items-center justify-center cursor-pointer"
              >
                <div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-500 group">
                  <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full"></span>
                  <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      class="w-5 h-5 text-white"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      class="w-5 h-5 text-white"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    Create
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default Createpost;

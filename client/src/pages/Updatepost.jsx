import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function Updateposts() {
  const { blogid } = useParams();
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/post/getPost/${blogid}`);
        const data = await response.json();
        if (data.success) {
          setPostData(data.post);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [blogid]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/post/updatePost/${blogid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Post updated successfully");
        navigate("/viewblogs"); // Redirect to view posts page after successful update
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          <h1 className="text-center text-3xl font-semibold mb-4">
            Update Post
          </h1>

          <form onSubmit={handleSubmit}>

            {/* Post ID (Read-only) */}
            <div className="mb-4">
              <input
                type="number"
                id="blogid"
                placeholder="Blog ID (Read-only)"
                name="blogid"
                value={postData.blogid}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* User ID */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="User ID"
                id="userid"
                name="userid"
                value={postData.userid}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={postData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <input
                type="date"
                id="date"
                placeholder="Date"
                name="date"
                value={postData.date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <textarea
                type="text"
                id="content"
                name="content"
                placeholder="Write Something..."
                value={postData.content}
                onChange={handleChange}
                rows={10}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Update Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Updateposts;

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Viewblogs() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]); 

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Set loading state to true before fetch
      try {
        const response = await fetch("/api/post/getPosts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
        setPosts([]); // Set empty campaigns on error
      } finally {
        setIsLoading(false); // Set loading state to false after fetch
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (blogid) => {
    try {
      const response = await fetch(
        `/api/post/deletePost/${blogid}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        setPosts(
          posts.filter((post) => post.blogid !== blogid)
        ); // Update posts state directly
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = posts.filter((post) =>
      post.blogid.toString().includes(event.target.value)
    );
    setFilteredPosts(filteredData);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-lg">
          <div className="text-center text-4xl font-bold">
            <h1>View Blogs</h1>
          </div>

          <div className="flex flex-row justify-between">
            <div className="mb-4 mt-4">
              <input
                type="text"
                placeholder="Search Posts"
                value={searchTerm}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>
            {currentUser.isAdmin && (
              <div>
                <Link to="/create-post">
                  <Button
                    type="submit"
                    className="border-2 border-customRed rounded-xl font-semibold px-2 py-1 mt-4 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Add Posts
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Blog ID
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Content
                </th>
                {currentUser.isAdmin && (
                  <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.blogid}
                  className="border border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-center">
                    {post.blogid}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {post.userid}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {post.content}
                  </td>
                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        onClick={() => handleDelete(post.blogid)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md ml-2"
                        onClick={() =>
                          navigate(`/update-post/${post.blogid}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewblogs;

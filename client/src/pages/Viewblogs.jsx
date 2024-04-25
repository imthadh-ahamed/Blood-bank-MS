import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Viewblogs() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postID=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser._id]);


  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-lg">
          {/* View Blogs Text */}
          <div className="text-center text-4xl font-bold">
            <h1>View Blogs</h1>
          </div>

          {/* Search and Add blog button line */}
          <div className="flex flex-row justify-between">
            {/* Search bar */}
            <div className="mb-4 mt-4">Search Bar</div>

            {/* Conditional rendering of Add Blogs button */}
            {currentUser.isAdmin && (
              <div>
                <Link to="/create-post">
                  <Button
                    type="submit"
                    className="border-2 border-customRed rounded-xl font-semibold px-2 py-1 mt-4 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Add Blogs
                  </Button>
                </Link>
              </div>
            )}
          </div>

{/* Table */}
          <div className="min-w-full">
            <table className="table-auto overflow-x-scroll">
              <thead>
                <tr className="">
                  <th className="px-4 py-2 bg-gray-200">Blog ID</th>
                  <th className="px-4 py-2 bg-gray-200">Date</th>
                  <th className="px-4 py-2 bg-gray-200">Post title</th>
                  <th className="px-4 py-2 bg-gray-200">Content</th>
                  {currentUser.isAdmin && (
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                  )}
                </tr>{" "}
              </thead>

              {userPosts.map((post) => (
                <tbody className="divide-y">
                  <tr className="text-center border-2 hover:bg-gray-200">
                  {currentUser.isAdmin && (
                    <td className="border px-4 py-2">{post.blogid}</td>
                    )}
                    <td className="border px-4 py-2">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{post.title}</td>
                    <td className="border px-4 py-2">{post.content}</td>

                    {currentUser.isAdmin && (
                      <td className="border px-4 py-2">
                        <div className="flex gap-4">
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setPostIdToDelete(post._id);
                            }}
                            className="font-medium text-red-500 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                          <Link
                            className="text-teal-500 hover:underline"
                            to={`/update-post/${post._id}`}
                          >
                            <span>Edit</span>
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>
                </tbody>
              ))}
            </table>
            

            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this post?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="red" onClick={handleDeletePost}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewblogs;

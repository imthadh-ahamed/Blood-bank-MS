import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput, Alert, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

function Updatepost() {
  const [blogid, setBlogID] = useState(""); // State for blog ID
  const [userid, setUserID] = useState(""); // State for user ID
  const [title, setTitle] = useState(""); // State for title
  const [date, setDate] = useState(""); // State for date
  const [content, setContent] = useState(""); // State for content
  const [publishError, setPublishError] = useState(null); // State for publish error
  const navigate = useNavigate(); // Hook for navigation
  const { blogId } = useParams(); // Get the blogId from URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?blogid=${encodeURIComponent(blogId)}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        const post = data.post;
        setBlogID(post.blogid); // Set the blogId state with fetched post blogId
        setUserID(post.userid); // Set the userId state with fetched post userId
        setTitle(post.title); // Set the title state with fetched post title
        setDate(post.date); // Set the date state with fetched post date
        setContent(post.content); // Set the content state with fetched post content
      } catch (error) {
        setPublishError(error.message); // Set error message if fetching fails
      }
    };
    fetchPost();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const res = await fetch(`/api/post/updatepost/${encodeURIComponent(blogId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogid, userid, title, date, content }), // Sending updated post data as JSON
      });
      const data = await res.json(); // Parsing response data
      if (!res.ok) {
        throw new Error(data.message || "Failed to update post.");
      }
      navigate("/postsuccess"); // Redirecting to post success page if request succeeds
    } catch (error) {
      setPublishError(error.message); // Setting publish error message if request fails
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
          <h1 className="text-center text-3xl font-semibold mb-4">Update Blog</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <TextInput
                type="text"
                placeholder="Blog ID"
                required
                value={blogid}
                onChange={(e) => setBlogID(e.target.value)}
              />
              <TextInput
                type="text"
                placeholder="User ID"
                required
                value={userid}
                onChange={(e) => setUserID(e.target.value)}
              />
              <TextInput
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextInput
                type="date"
                placeholder="Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Textarea
                placeholder="Write something..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-72 mb-12 bg-white rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              Update
            </Button>
            {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Updatepost;

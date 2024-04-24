import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Createpost() {
  const [userid, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, title, date, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Failed to publish.');
        return;
      }
      navigate('/postsuccess');
    } catch (error) {
      setPublishError('Something went wrong');
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
          <h1 className="text-center text-3xl font-semibold mb-4">Add Blogs</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {/* Title */}
              <TextInput
                type="text"
                placeholder="User ID"
                required
                value={userid}
                onChange={(e) => setUserID(e.target.value)}
              />
              
              
              {/* Title */}
              <TextInput
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Date */}
              <TextInput
                type="date"
                placeholder="Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              {/* Enter the blog body */}
              <ReactQuill
                theme="snow"
                placeholder="Write something..."
                required
                value={content}
                onChange={(value) => setContent(value)}
                className="h-72 mb-12 bg-white rounded-xl"
              />
            </div>

            {/* Publish button */}
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              Publish
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

export default Createpost;

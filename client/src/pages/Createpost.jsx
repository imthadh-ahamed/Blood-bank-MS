import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Createpost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        // setPublishError(null);
        navigate('/postsuccess');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }

  }
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
            <div className="flex flex-col  gap-3 justify-between">
              {/* Title */}
              <TextInput
                type="text"
                placeholder="Title"
                required
                id="title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {/* Date */}
              <TextInput
                type="date"
                placeholder="Date"
                required
                id="date"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              {/* Enter the blog body */}
              <ReactQuill
                theme="snow"
                placeholder="Write something..."
                required
                className="h-72 mb-12 bg-white rounded-xl"
                onChange={(value) => {
                  setFormData({ ...formData, content: value });
                }}
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

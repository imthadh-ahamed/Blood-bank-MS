import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Addblogs() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          <h1 className="text-center text-3xl font-semibold mb-4">Add Blogs</h1>
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col  gap-3 justify-between">
              
            {/* Blog ID */}
              <TextInput
                type="text"
                placeholder="Blog ID"
                required
                id="blogid"
              />

            {/* Title */}
              <TextInput
                type="text"
                placeholder="Title"
                required id="title"
              />

            {/* Date */}
              <TextInput
                type="date"
                placeholder="Date"
                required
                id="date"
              />
              
            {/* Enter the blog body */}
              <ReactQuill
                theme="snow"
                placeholder="Write something..."
                required
                className="h-72 mb-12 bg-white"
              />
            </div>
            
            {/* Publish button */}
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              Publish
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Addblogs;

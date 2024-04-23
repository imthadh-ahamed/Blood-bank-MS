import React from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-8">
            <img
              src="./images/logo.png"
              alt="App Logo"
              className="w-32 mx-auto"
            />
            <h2 className="text-2xl font-bold mt-4">Sign In</h2>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-customRed"
              />
            </div>

            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-customRed"
              />
            </div>
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-40 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              Sign In
            </Button>
          </form>
          <div className="flex justify-center mt-4 gap-3">
            <span className="text-sm"> Create an account? </span>
            <Link to="/signup" className="text-blue-500 font-semibold">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

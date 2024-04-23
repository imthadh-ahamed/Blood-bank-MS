import { Label, TextInput, Button, Alert } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

function Signin() {
  // Define state variables using useState hook
  const [formData, setFormData] = useState({}); // State for form data
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Update form data in state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!formData.email || !formData.password) {
      // Validate form fields
      return dispatch(signInFailure("Please fill out all fields.")); // Set error message if fields are missing
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        // Make a POST request to signup endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send form data in JSON format
      });
      const data = await res.json(); // Parse response JSON
      // Check if signup was unsuccessful
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      // Check if request was successful
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/donordashboard"); // Navigate to home page
      }
    } catch (error) {
      // Handle duplicate key error
      if (error.message.includes("duplicate key error")) {
        return setErrorMessage(
          "An account with this email or username already exists."
        );
      }
      dispatch(signInFailure(error.message));
    }
  };

  // Render the signup form
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
            <h2 className="text-2xl font-bold mt-4">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email input */}
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-customRed"
              />
            </div>

            {/* Password input */}
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-customRed"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              SignIn
            </Button>
          </form>

          {/* Link to sign in page */}
          <div className="flex justify-center mt-4 gap-3">
            <span className="text-sm">Create an account? </span>
            <Link to="/signup" className="text-blue-500 font-semibold">
              SignUp
            </Link>
          </div>

          {/* Display error message if present */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin; // Export the Signup component

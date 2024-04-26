import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput, Alert, Modal } from "flowbite-react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Adddonor() {
  // State variables for form fields and error handling
  const [donorid, setDonorID] = useState("");
  const [fullname, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [dateofbirth, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bloodtype, setBloodType] = useState("");
  const [contactno, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [preblddntdate, setpreblddntdate] = useState("");
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Sending a POST request to backend API endpoint
      const res = await fetch("localhost:3000/api/donor/createdonor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorid,
          fullname,
          nic,
          dateofbirth,
          gender,
          address,
          bloodtype,
          contactno,
          email,
          preblddntdate,
        }), // Sending form data as JSON
      });
      const data = await res.json(); // Parsing response data
      if (!res.ok) {
        setPublishError(data.message || "Failed to publish."); // Setting publish error message if request fails
        return;
      }
      setShowModal(true);
    } catch (error) {
      setPublishError("Something went wrong"); // Handling unexpected errors
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
          <h1 className="text-center text-3xl font-semibold mb-4">Add Donors</h1>{" "}
          {/* Heading of the page */}
          {/* Form for adding blogs */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {/* Blog ID */}
              <TextInput
                type="number"
                placeholder="Donor ID"
                required
                value={donorid}
                onChange={(e) => setDonorID(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="Full Name"
                required
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="NIC"
                required
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />

              <TextInput
                type="date"
                placeholder="Date of Birth"
                required
                value={dateofbirth}
                onChange={(e) => setDOB(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="Gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="Blood Type"
                required
                value={bloodtype}
                onChange={(e) => setBloodType(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="Contact Number"
                required
                value={contactno}
                onChange={(e) => setContactNo(e.target.value)}
              />

              <TextInput
                type="text"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextInput
                type="date"
                placeholder="Previous Blood Donate Date"
                required
                value={preblddntdate}
                onChange={(e) => setpreblddntdate(e.target.value)}
              />
            </div>

            {/* Publish button */}
            <Button
              type="submit"
              className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
            >
              Publish
            </Button>

            {/* Displaying publish error if present */}
            {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )}
          </form>
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
                  Do you want add another donor details?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="red" onClick={() => setShowModal(false)}>
                    Yes
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/Adddonor");
                    }}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default Adddonor;

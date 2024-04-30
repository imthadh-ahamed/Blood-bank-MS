import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal } from "flowbite-react";
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
      const response = await fetch("/api/donor/createdonor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      const data = await response.json(); // Parsing response data

      if (data.success) {
        console.log("Donor created successfully");
        navigate("/viewdonors");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDonorID("");
      setFullName("");
      setNic("");
      setDOB("");
      setGender("");
      setAddress("");
      setBloodType("");
      setContactNo("");
      setEmail("");
      setpreblddntdate("");
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
          {/* Heading of the page */}
          <h1 className="text-center text-3xl font-semibold mb-4">
            Add Donors
          </h1>

          {/* Form for adding donors */}
          <form onSubmit={handleSubmit}>
            {/* Donor ID */}
            <div className="mb-4">
              <input
                type="number"
                id="donorid"
                placeholder="Donor ID"
                name="donorid"
                value={donorid}
                onChange={(e) => setDonorID(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                id="fullname"
                placeholder="Full Name"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* NIC */}
            <div className="mb-4">
              <input
                type="text"
                id="nic"
                placeholder="NIC"
                name="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
                pattern="[a-zA-Z0-9]{12}"
                title="NIC must contain exactly 12 alphanumeric characters"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <input
                type="date"
                id="dateofbirth"
                placeholder="Date of Birth"
                name="dateofbirth"
                value={dateofbirth}
                onChange={(e) => setDOB(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              ></input>
            </div>

            {/* Blood Type */}
            <div className="mb-4">
              <select
                id="bloodtype"
                name="bloodtype"
                value={bloodtype}
                onChange={(e) => setBloodType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Contact No */}
            <div className="mb-4">
              <input
                type="text"
                id="contactno"
                name="contactno"
                value={contactno}
                placeholder="Contact No"
                onChange={(e) => setContactNo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
                pattern="[0-9]{10}"
                title="Contact number must be exactly 10 digits"
              />
            </div>

            {/* E-mail */}
            <div className="mb-4">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address"
              />
            </div>

            {/* Previous Blood Donate Date */}
            <div className="mb-4">
              <input
                type="date"
                id="preblddntdate"
                name="preblddntdate"
                value={preblddntdate}
                placeholder="Previous Blood Donate Date"
                onChange={(e) => setpreblddntdate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              ></input>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>

          {/* Displaying publish error if present */}
          {publishError && (
            <div className="mt-5 text-red-500">{publishError}</div>
          )}

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

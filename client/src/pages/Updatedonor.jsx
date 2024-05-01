import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function Updatedonors() {
  const { donorid } = useParams();
  const [donorData, setDonorData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonor = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/donor/getCampaign/${donorid}`);
        const data = await response.json();
        if (data.success) {
          setDonorData(data.donor);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonor();
  }, [donorid]);

  const handleChange = (e) => {
    setDonorData({ ...donorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/donor/updatedonor/${donorid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Donor updated successfully");
        navigate("/viewdonors"); // Redirect to view donors page after successful update
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
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
          <h1 className="text-center text-3xl font-semibold mb-4">
            Update Donor
          </h1>

          {/* Form for updating donors */}
          <form onSubmit={handleSubmit}>
            {/* Donor ID (Read-only) */}
            <div className="mb-4">
              <label htmlFor="donorid" className="block text-gray-700">
                Donor ID
              </label>
              <input
                type="number"
                id="donorid"
                placeholder="Donor ID (Read-only)"
                name="donorid"
                value={donorData.donorid}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                id="fullname"
                name="fullname"
                value={donorData.fullname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* NIC */}
            <div className="mb-4">
              <label htmlFor="nic" className="block text-gray-700">
                NIC
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                placeholder="NIC"
                value={donorData.nic}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                pattern="[a-zA-Z0-9]{12}"
                title="NIC must contain exactly 12 alphanumeric characters"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dateofbirth" className="block text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateofbirth"
                placeholder="Date of Birth"
                name="dateofbirth"
                value={donorData.dateofbirth}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={donorData.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                value={donorData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Blood Type */}
            <div className="mb-4">
              <label htmlFor="bloodtype" className="block text-gray-700">
                Blood Type
              </label>
              <select
                id="bloodtype"
                name="bloodtype"
                value={donorData.bloodtype}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
              <label htmlFor="contactno" className="block text-gray-700">
                Contact No
              </label>
              <input
                type="text"
                placeholder="Contact No"
                id="contactno"
                name="contactno"
                value={donorData.contactno}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Contact number must be exactly 10 digits"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* E-mail */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                E-mail
              </label>
              <input
                type="text"
                placeholder="E-mail"
                id="email"
                name="email"
                value={donorData.email}
                onChange={handleChange}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Previous Blood Donate Date */}
            <div className="mb-4">
              <label htmlFor="preblddntdate" className="block text-gray-700">
                Previous Blood Donate Date
              </label>
              <input
                type="date"
                placeholder="Previous Blood Donate Date"
                id="preblddntdate"
                name="preblddntdate"
                value={donorData.preblddntdate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Create Date */}
            <div className="mb-4">
              <label htmlFor="createDate" className="block text-gray-700">
                Create Date
              </label>
              <input
                type="date"
                placeholder="Create Date"
                id="createDate"
                name="createDate"
                value={donorData.createDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Update Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Updatedonors;

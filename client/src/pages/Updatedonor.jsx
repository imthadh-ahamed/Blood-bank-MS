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
      const response = await fetch(
        `/api/donor/updatedonor/${donorid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donorData),
        }
      );

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

          <form onSubmit={handleSubmit}>

            {/* Donor ID (Read-only) */}
            <div className="mb-4">
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
              <input
                type="text"
                placeholder="Full Name"
                id="fullname"
                name="fullname"
                value={donorData.fullname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* NIC */}
            <div className="mb-4">
              <input
                type="text"
                id="nic"
                name="nic"
                placeholder="NIC"
                value={donorData.nic}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <input
                type="date"
                id="dateofbirth"
                placeholder="Date of Birth"
                name="dateofbirth"
                value={donorData.dateofbirth}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <input
                type="text"
                id="gender"
                name="gender"
                placeholder="Gender"
                value={donorData.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                value={donorData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Blood Type */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Blood Type"
                id="bloodtype"
                name="bloodtype"
                value={donorData.bloodtype}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Contact No */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Contact No"
                id="contactno"
                name="contactno"
                value={donorData.contactno}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* E-mail */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="E-mail"
                id="email"
                name="email"
                value={donorData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />

              {/* Previous Blodd Donate */}
            </div>
            <div className="mb-4">
              <input
                type="date"
                placeholder="Address"
                id="preblddntdate   1"
                name="preblddntdate"
                value={donorData.preblddntdate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
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

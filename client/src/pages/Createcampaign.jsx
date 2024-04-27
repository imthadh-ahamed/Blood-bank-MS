import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Createcampaign() {
  const [campaignID, setCampaignID] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [requirements, setRequirements] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/campaign/createCampaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignID,
          campaignName,
          location,
          date,
          organization,
          requirements,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Campaign created successfully");
        navigate("/viewcampaigns"); // Redirect to view campaigns page after successful creation
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCampaignID("");
      setCampaignName("");
      setLocation("");
      setDate("");
      setOrganization("");
      setRequirements("");
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
            Create Campaign
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Campaign ID */}
            <div className="mb-4">
              <input
                type="number"
                id="campaignID"
                placeholder="Campaign ID"
                name="campaignID"
                value={campaignID}
                onChange={(e) => setCampaignID(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Campaign Name */}
            <div className="mb-4">
              <input
                type="text"
                id="campaignName"
                placeholder="Campaign Name"
                name="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <input
                type="text"
                id="location"
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <input
                type="date"
                id="date"
                placeholder="Date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Organization */}
            <div className="mb-4">
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <textarea
                id="requirements"
                name="requirements"
                value={requirements}
                placeholder="Requirements"
                onChange={(e) => setRequirements(e.target.value)}
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Createcampaign;

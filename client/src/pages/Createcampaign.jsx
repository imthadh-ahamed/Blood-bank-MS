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
              <label htmlFor="campaignID" className="block text-gray-700">
                Campaign ID
              </label>
              <input
                type="number"
                id="campaignID"
                placeholder="1"
                name="campaignID"
                value={campaignID}
                onChange={(e) => setCampaignID(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Campaign Name */}
            <div className="mb-4">
              <label htmlFor="campaignName" className="block text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                id="campaignName"
                placeholder="Save Life"
                name="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Galle Face, Colombo"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
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
              <label htmlFor="organization" className="block text-gray-700">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="LEO Club"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <label htmlFor="requirements" className="block text-gray-700">
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={requirements}
                placeholder="Write some requirements..."
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
                class="w-full h-40 flex items-center justify-center cursor-pointer"
              >
                <div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-500 group">
                  <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full"></span>
                  <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      class="w-5 h-5 text-white"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      class="w-5 h-5 text-white"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    Create
                  </span>
                </div>
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

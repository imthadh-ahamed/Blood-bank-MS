import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function Updatecampaigns() {
  const { campaignID } = useParams();
  const [campaignData, setCampaignData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/campaign/getCampaign/${campaignID}`);
        const data = await response.json();
        if (data.success) {
          setCampaignData(data.campaign);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaign();
  }, [campaignID]);

  const handleChange = (e) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/campaign/updateCampaign/${campaignID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(campaignData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Campaign updated successfully");
        navigate("/viewcampaigns"); // Redirect to view campaigns page after successful update
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
            Update Campaign
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Campaign ID (Read-only) */}
            <div className="mb-4">
              <input
                type="number"
                id="campaignID"
                placeholder="Campaign ID (Read-only)"
                name="campaignID"
                value={campaignData.campaignID}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Campaign Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Campaign Name"
                id="campaignName"
                name="campaignName"
                value={campaignData.campaignName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={campaignData.location}
                onChange={handleChange}
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
                value={campaignData.date}
                onChange={handleChange}
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
                value={campaignData.organization}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                required
              />
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <textarea
                type="text"
                placeholder="Requirements"
                id="requirements"
                name="requirements"
                value={campaignData.requirements}
                onChange={handleChange}
                rows={5}
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

export default Updatecampaigns;

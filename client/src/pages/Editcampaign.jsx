import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, TextInput } from "flowbite-react";

function Editcampaign() {
  const { campaignID } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/getCampaign/${campaignID}`);
        const data = await response.json();
        if (data.success) {
          setCampaign(data.campaign);
        } else {
          console.error(data.message);
          navigate("/viewcampaigns"); // Redirect to campaigns page on error
        }
      } catch (error) {
        console.error(error);
        navigate("/viewcampaigns"); // Redirect to campaigns page on error
      }
    };
    fetchCampaign();
  }, [campaignID, navigate]);

  const handleInputChange = (event) => {
    setCampaign({ ...campaign, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/updateCampaign/${campaignID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/viewcampaigns"); // Redirect to campaigns page on success
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
        <div className="flex-grow bg-gray-300 p-5 rounded-lg">
          <div className="text-center text-4xl font-bold">
            <h1>View Campaigns</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            type="number"
            placeholder="Campaign ID"
            name="campaignID"
            value={campaign.campaignID || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            type="text"
            placeholder="Campaign Name"
            name="campaignName"
            value={campaign.campaignName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            type="text"
            name="location"
            placeholder="Location"
            value={campaign.location || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            type="date"
            name="date"
            placeholder="Date"
            value={campaign.date || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            type="text"
            name="organization"
            placeholder="Organization"
            value={campaign.organization || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            type="text"
            name="requirements"
            placeholder="Requirements"
            value={campaign.requirements || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            className="border-2 border-customRed rounded-xl font-semibold px-4 py-2 mt-4 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
          >
            Update Campaign
          </Button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Editcampaign;

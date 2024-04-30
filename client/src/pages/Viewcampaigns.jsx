import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Viewcampaigns() {
  const { currentUser } = useSelector((state) => state.user);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true); // Set loading state to true before fetch
      try {
        const response = await fetch("/api/campaign/getCampaigns");
        const data = await response.json();
        // Sort the campaigns array by campaignID in ascending order
        const sortedCampaigns = data.campaigns.sort((a, b) => a.campaignID - b.campaignID);
        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error(error);
        setCampaigns([]); // Set empty campaigns on error
      } finally {
        setIsLoading(false); // Set loading state to false after fetch
      }
    };
    fetchCampaigns();
  }, []);

  const handleDelete = async (campaignID) => {
    setShowModal(false);
    try {
      const response = await fetch(
        `/api/campaign/deleteCampaign/${campaignID}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        setCampaigns(
          campaigns.filter((campaign) => campaign.campaignID !== campaignID)
        ); // Update campaigns state directly
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = campaigns.filter((campaign) =>
      campaign.campaignID.toString().includes(event.target.value)
    );
    setFilteredCampaigns(filteredData);
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

          <div className="flex flex-row justify-between">
            <div className="mb-4 mt-4">
              <input
                type="text"
                placeholder="Search Campaigns"
                value={searchTerm}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>
            {currentUser.isAdmin && (
              <div>
                <Link to="/create-campaign">
                  <Button
                    type="submit"
                    className="border-2 border-customRed rounded-xl font-semibold px-2 py-1 mt-4 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Add Campaign
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
              {currentUser.isAdmin && (
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Campaign ID
                </th>
              )}
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Requirements
                </th>
                {currentUser.isAdmin && (
                  <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.campaignID}
                  className="border border-gray-200 hover:bg-gray-100"
                >
                  {currentUser.isAdmin && (
                  <td className="px-6 py-4 text-center">
                    {campaign.campaignID}
                  </td>
                  )}
                  <td className="px-6 py-4 text-center">
                    {campaign.campaignName}
                  </td>
                  <td className="px-6 py-4 text-center">{campaign.location}</td>
                  <td className="px-6 py-4 text-center">
                    {new Date(campaign.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {campaign.organization}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {campaign.requirements}
                  </td>
                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        onClick={() => {
                          setSelectedCampaignId(campaign.campaignID);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md ml-2"
                        onClick={() =>
                          navigate(`/update-campaign/${campaign.campaignID}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

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
                    Are you sure you want to delete this post?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="red" onClick={() => handleDelete(selectedCampaignId)}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>




        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewcampaigns;

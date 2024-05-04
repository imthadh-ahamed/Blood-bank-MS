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
        const sortedCampaigns = data.campaigns.sort(
          (a, b) => a.campaignID - b.campaignID
        );
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
                  <button
                    type="submit"
                    className="relative w-36 h-10 cursor-pointer flex items-center border border-customRed bg-customRed group hover:bg-red-600 active:bg-red-600 active:border-red-600 rounded-xl"
                  >
                    <span class="text-white font-semibold mx-auto transform group-hover:translate-x-20 transition-all duration-300">
                      Add
                    </span>
                    <span class="absolute right-0 h-full w-10 rounded-lg bg-customRed flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                      <svg
                        class="svg w-8 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="12" x2="12" y1="5" y2="19"></line>
                        <line x1="5" x2="19" y1="12" y2="12"></line>
                      </svg>
                    </span>
                  </button>
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
                    <td className="px-2 py-4 text-center flex flex-col gap-3">
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 min-w-max"
                        onClick={() => {
                          setSelectedCampaignId(campaign.campaignID);
                          setShowModal(true);
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                        Delete
                      </button>

                      <button
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 text-center"
                        onClick={() =>
                          navigate(`/update-campaign/${campaign.campaignID}`)
                        }
                      >
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2zM3 7h1m-1 4h1m-1 4h1m16-8v8m-4-8v8m-4 0h4m-8 0H7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
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
                  <Button
                    color="red"
                    onClick={() => handleDelete(selectedCampaignId)}
                  >
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

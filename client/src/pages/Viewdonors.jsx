import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Viewdonors() {
  const { currentUser } = useSelector((state) => state.user);
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonorId, setSelectedDonorId] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/donor/getdonors");
        const data = await response.json();
        const sortedDonors = data.donors.sort((a, b) => a.donorid - b.donorid);
        setDonors(sortedDonors);
      } catch (error) {
        console.error(error);
        setDonors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const handleDelete = async (donorid) => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/donor/deletedonor/${donorid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setDonors(donors.filter((donor) => donor.donorid !== donorid)); // Update campaigns state directly
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const fetchData = (value) => {
    fetch("/api/donor/getdonors")
      .then((response) => response.json())
      .then((data) => {
        const sortedDonors = data.donors.sort((a, b) => a.donorid - b.donorid);
        setDonors(sortedDonors); // Update donors state with all donors

        const filteredDonors = sortedDonors.filter(
          (donor) =>
            donor.fullname.toLowerCase().includes(value.toLowerCase()) ||
            donor.address.toLowerCase().includes(value.toLowerCase()) ||
            donor.bloodtype.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDonors(filteredDonors); // Update filteredDonors state with filtered donors
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
        setDonors([]); // Clear donors state in case of error
        setFilteredDonors([]); // Clear filteredDonors state in case of error
      });
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
            <h1>View Donors</h1>
          </div>

          {/* Search bar */}
          <div className="flex flex-row justify-between">
            <div className="mb-4 mt-4">
              <input
                type="text"
                placeholder="Search Donors"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Add donor button */}
            {currentUser.isAdmin && (
              <div>
                <Link to="/create-donor">
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
                    Donor ID
                  </th>
                )}
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  NIC
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Contact No
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  E-mail
                </th>
                <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                  Previous Blood Donate Date
                </th>
                {currentUser.isAdmin && (
                  <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                    Create Date
                  </th>
                )}
                {currentUser.isAdmin && (
                  <th className="px-6 py-3 text-center border border-gray-200 bg-gray-100 text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr
                  key={donor.donorid}
                  className="border border-gray-200 hover:bg-gray-100"
                >
                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center">{donor.donorid}</td>
                  )}
                  <td className="px-6 py-4 text-center">{donor.fullname}</td>
                  <td className="px-6 py-4 text-center">{donor.nic}</td>
                  <td className="px-6 py-4 text-center">
                    {new Date(donor.dateofbirth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">{donor.gender}</td>
                  <td className="px-6 py-4 text-center">{donor.address}</td>
                  <td className="px-6 py-4 text-center">{donor.bloodtype}</td>
                  <td className="px-6 py-4 text-center">{donor.contactno}</td>
                  <td className="px-6 py-4 text-center">{donor.email}</td>
                  <td className="px-6 py-4 text-center">
                    {new Date(donor.preblddntdate).toLocaleDateString()}
                  </td>
                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center">
                      {new Date(donor.createDate).toLocaleDateString()}
                    </td>
                  )}

                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center flex flex-col gap-3">
                      <button
                        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        onClick={() => {
                          setSelectedDonorId(donor.donorid);
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
                        className="inline-flex items-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        onClick={() =>
                          navigate(`/update-donor/${donor.donorid}`)
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
                    onClick={() => handleDelete(selectedDonorId)}
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

export default Viewdonors;

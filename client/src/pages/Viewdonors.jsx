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
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = donors.filter((donor) =>
      donor.donorid.toString().includes(event.target.value)
    );
    setFilteredDonors(filteredData);
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
                value={searchTerm}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
            </div>

            {/* Add donor button */}
            {currentUser.isAdmin && (
              <div>
                <Link to="/create-donor">
                  <Button
                    type="submit"
                    className="border-2 border-customRed rounded-xl font-semibold px-2 py-1 mt-4 mb-4 bg-customRed text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Add Donor
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
                  <td className="px-6 py-4 text-center">
                    {donor.donorid}
                  </td>
                  )}
                  <td className="px-6 py-4 text-center">
                    {donor.fullname}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.nic}
                    </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(donor.dateofbirth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.gender}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.address}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.bloodtype}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.contactno}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {donor.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(donor.preblddntdate).toLocaleDateString()}
                  </td>
                  {currentUser.isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        onClick={() => {
                          setSelectedDonorId(donor.donorid);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md ml-2"
                        onClick={() =>
                          navigate(`/update-donor/${donor.donorid}`)
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
                    <Button color="red" onClick={() => handleDelete(selectedDonorId)}>
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

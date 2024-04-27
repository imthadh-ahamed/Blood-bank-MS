import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
// import LineChart from '../components/Linechart';

function Donordashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [donors, setDonors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [monthlyDonors, setMonthlyDonors] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaign/getCampaigns');
        const data = await response.json();

        if (data.success) {
          setCampaigns(data.campaigns);
          setTotalCampaigns(data.totalCampaigns); // Update totalCampaigns state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDonors = async () => {
      try {
        const response = await fetch('/api/donor/getdonors');
        const data = await response.json();

        if (data.success) {
          setDonors(data.donors);
          setTotalDonors(data.totalDonors); // Update totalDonors state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/donor/getdonors');
        const data = await response.json();

        if (data.success) {
          setDonors(data.donors);
          setTotalDonors(data.totalDonors); // Update totalDonors state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchMonthlyData = async () => {
    //   try {
    //     const response = await fetchMonthlyDonors();
    //     const data = await response.json();
    //     if (data.success) {
    //       setMonthlyDonors(
    //         data.monthlyDonors.map((item) => ({
    //           month: item._id, // Extract month value
    //           count: item.count, // Extract count value
    //         }))
    //       );
    //     } else {
    //       console.error(data.message);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchMonthlyData();
    fetchCampaigns();
    fetchDonors();
  }, []);


  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          <div className="flex justify-between flex-wrap">
          {/* Donor Counts */}
          <div className="p-4 bg-gray-400 rounded-lg flex flex-col w-full md:w-1/3 lg:w-1/4 mb-5">
            <div className="flex justify-between">
              <div className="p-2">
                <FaUserDoctor className="text-8xl" />
              </div>
              <div className="p-2 flex flex-col">
                <div className="text-6xl text-blue-700 font-bold text-center">
                {totalDonors}
                </div>
                <div className="text-2xl  text-blue-700 font-bold text-center">
                  Donors
                </div>
              </div>
            </div>
            <div className="text-blue-500 text-right">
              <Link to="/viewdonors">See all</Link>
            </div>
          </div>

          {/* Campaigns counts */}
          <div className="p-4 bg-gray-400 rounded-lg flex flex-col w-full md:w-1/3 lg:w-1/4 mb-5">
            <div className="flex justify-between">
              <div className="p-2">
                <MdCampaign className="text-8xl" />
              </div>
              <div className="p-2 flex flex-col">
                <div className="text-6xl text-blue-700 font-bold text-center">
                {totalCampaigns}
                </div>
                <div className="text-2xl  text-blue-700 font-bold text-center">
                  Campaigns
                </div>
              </div>
            </div>
            <div className="text-blue-500 text-right">
              <Link to="/viewcampaigns">See all</Link>
            </div>
          </div>

          {/* Blogs Counts */}
          <div className="p-4 bg-gray-400 rounded-lg flex flex-col w-full md:w-1/3 lg:w-1/4 mb-5">
            <div className="flex justify-between">
              <div className="p-2">
                <LiaBlogSolid className="text-8xl" />
              </div>
              <div className="p-2 flex flex-col">
                <div className="text-6xl text-blue-700 font-bold text-center">
                  15
                </div>
                <div className="text-2xl  text-blue-700 font-bold text-center">
                  Blogs
                </div>
              </div>
            </div>
            <div className="text-blue-500 text-right">
              <Link to="/addblogs">See all</Link>
            </div>
          </div>
          </div>
          {/* Line Chart */}
          <div className="text-center">
            <div>
              <h1> Monthly Donor Demand </h1>
              <p> Want to add the line chart</p>
              {/* <LineChart /> */}
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donordashboard;

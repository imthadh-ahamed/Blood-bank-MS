import React, { useState, useEffect, Component } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Donordashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [donors, setDonors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [monthlyDonors, setMonthlyDonors] = useState([]);


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaign/getCampaigns");
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
        const response = await fetch("/api/donor/getdonors");
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

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post/getPosts");
        const data = await response.json();

        if (data.success) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts); // Update totalPosts state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMonthlyDonors = async () => {
      try {
        const response = await fetch("/api/donor/getdonorsMonthly");
        const data = await response.json();
        if (data.success) {
          // Set the monthly donor data
          setMonthlyDonors(data.monthlyDonors);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCampaigns();
    fetchDonors();
    fetchPosts();
    fetchMonthlyDonors();
  }, []);


  const lineChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Donor Demand"
    },
    axisY: {
      title: "Donors"
    },
    axisX: {
      title: "Months of Year",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Month {x}: {y}",
      dataPoints: monthlyDonors.map((monthlyDonor, index) => ({
        x: index + 1,
        y: monthlyDonor.count
      }))
    }]
  };

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
                    {totalPosts}
                  </div>
                  <div className="text-2xl  text-blue-700 font-bold text-center">
                    Blogs
                  </div>
                </div>
              </div>
              <div className="text-blue-500 text-right">
                <Link to="/viewblogs">See all</Link>
              </div>
            </div>
          </div>
          {/* Line Chart */}
          <div className="text-center">
            <div>
              <CanvasJSChart options={lineChartOptions} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donordashboard;

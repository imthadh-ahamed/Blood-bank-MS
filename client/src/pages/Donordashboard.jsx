import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";

function Donordashboard() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-300 p-5 rounded-xl">
          {/* Donor Counts */}
          <div className="p-4 bg-gray-400 rounded-lg flex flex-col w-full md:w-1/3 lg:w-1/4 mb-5">
            <div className="flex justify-between">
              <div className="p-2">
                <FaUserDoctor className="text-8xl" />
              </div>
              <div className="p-2 flex flex-col">
                <div className="text-6xl text-blue-700 font-bold text-center">
                  50
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
                  10
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

          {/* Line Chart */}
          <div className="flex flex-row justify-between">
            <div>
              Line chart 1
            </div>
            <div>
              Line chart 2
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donordashboard;

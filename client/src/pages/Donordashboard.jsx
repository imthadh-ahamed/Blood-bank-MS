import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function Donordashboard() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Donordashboard;

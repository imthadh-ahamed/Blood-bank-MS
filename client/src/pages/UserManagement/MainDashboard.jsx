import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function MainDashboard() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div>
          <Sidebar />
        </div>

        <div className="flex-grow p-5 rounded-xl flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-8 m-20 sm:text-left sm:w-1/2 sm:mr-10">
              <div>
                <h1 className="font-sans text-center sm:text-5xl text-2xl font-black text-red-700 mb-10"> Donate Blood!!!</h1>
              </div>
              <div className="text-red-500 text-sm font-semibold sm:text-lg text-center">
                We have so many great heroes who helped us <br />
                in contributing towards the betterment of out Health Services.
              </div>
              <div className="text-red-500 text-sm font-semibold sm:text-lg text-center">
                We are greatful for each and every donor out there <br />
                and would like to make your contribution significant <br />
                by posting the list of each every donor asociated with Donation Desk.
              </div>
            </div>

            <div className="justify-items-center">
              <img src="../images/dashboard-image.jpg" alt="Dashboard Image" width={'800px'} />
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainDashboard;

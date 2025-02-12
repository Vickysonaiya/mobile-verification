// import React from 'react'
import { CgSpinner } from "react-icons/cg";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import image from "./images";
// import "./index.css";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigate("/");
//     }, 1000);
//   };

//   return (
//     <section className="flex flex-col items-center h-screen">
//   <img
//     src={image.image3}
//     alt="Sign in illustration"
//     className="w-66 h-96 image"
//   />
//   <button
//     onClick={handleNavigate}
//     className="absolute bottom-10 bg-black flex gap-1 items-center justify-center py-2 px-6 text-white rounded-md text-lg hover:bg-black transition duration-300"
//   >
//     {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//     <span>Go To Login</span>
//   </button>
// </section>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Host");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div className="min-h-screen bg-black text-white p-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Hello, Vicky Sonaiya <span className="text-green-500">●</span>
          </h1>
          <p className="text-gray-400">Full Stack Developer</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-800 rounded-lg p-1 w-64">
          <button
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "Host" ? "bg-white text-black" : "text-white"
              }`}
            onClick={() => setActiveTab("Host")}
          >
            Host
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "Guest" ? "bg-white text-black" : "text-white"
              }`}
            onClick={() => setActiveTab("Guest")}
          >
            Guest
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between my-6 text-center">
          <div>
            <p className="text-4xl font-bold">07</p>
            <p className="text-gray-400">Lorem Ipsum</p>
          </div>
          <div>
            <p className="text-4xl font-bold">15</p>
            <p className="text-gray-400">Lorem Ipsum</p>
          </div>
          <div>
            <p className="text-4xl font-bold">28</p>
            <p className="text-gray-400">Lorem Ipsum</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 gap-4">
          {["Invites", "Watchlist", "Location", "Profile"].map((item) => (
            <div key={item} className="bg-white text-black p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-lg">{item}</h2>
              <p className="text-gray-600">Lorem Ipsum</p>
            </div>
          ))}
        </div>

        {/* Invite Guest Button */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center bg-white text-black py-2 px-4 rounded-lg font-bold shadow-md">
            <span className="mr-2 text-xl">➕</span> Invite Guest
          </button>
        </div>
        <div className="mt-6 flex justify-center">
        <button
          onClick={handleNavigate}
          className="absolute bottom-10 bg-white flex py-2 px-6 text-black rounded-md text-lg font-bold transition duration-300"
        >
          {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          <span className="mr-2 text-xl">Go To Login</span>
        </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

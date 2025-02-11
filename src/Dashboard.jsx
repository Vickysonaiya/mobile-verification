import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./images";
import "./index.css";

const Dashboard = () => {
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
    <section className="flex flex-col items-center h-screen">
  <img
    src={image.image3}
    alt="Sign in illustration"
    className="w-66 h-96 image"
  />
  <button
    onClick={handleNavigate}
    className="absolute bottom-10 bg-black flex gap-1 items-center justify-center py-2 px-6 text-white rounded-md text-lg hover:bg-black transition duration-300"
  >
    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
    <span>Go To Login</span>
  </button>
</section>
  );
};

export default Dashboard;

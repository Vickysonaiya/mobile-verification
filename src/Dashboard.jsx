import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="bg-slate-900 flex flex-col items-center justify-center h-screen">
      <h2 className="text-center text-white font-medium text-2xl mb-4">
        Welcome to the Dashboard!
      </h2>
      <img
        src="https://i.pinimg.com/736x/a6/b1/f1/a6b1f1f9fc5d1da371e6578b14288c6a.jpg"
        alt="Sign in illustration"
        className="mx-auto"
      />
      <button
        onClick={handleNavigate}
        className="bg-emerald-500 flex gap-1 items-center justify-center py-2 px-6 text-white rounded-md text-lg hover:bg-emerald-600 transition duration-300"
      >
        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
        <span>Go To Login</span>
      </button>
    </section>
  );
};

export default Dashboard;

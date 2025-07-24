import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const JobCard = ({ job }) => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="w-full flex justify-center">
      <div
        onClick={() => navigate(`/job-details/${job._id}`)}
        className="cursor-pointer border border-gray-200 rounded-2xl bg-gradient-to-r from-purple-200/80 to-white p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4 h-20">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-indigo-300 group-hover:border-indigo-500 transition"
            src={`http://localhost:4000/uploads/${job.company.logo}`}
            alt="company logo"
          />
        </div>

        {/* Job Info */}
        <div className="text-center text-gray-800 space-y-2 ">
          <span className="inline-block text-xs font-semibold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            {job.type}
          </span>
          <h2 className="text-lg sm:text-xl font-bold truncate">{job.title}</h2>
          <p className="text-sm text-gray-500 truncate">
            <span className="font-medium text-gray-700">Company:</span>{" "}
            {job.company.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            <span className="font-medium text-gray-700">Location:</span>{" "}
            {job.location}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-indigo-600 font-bold text-base sm:text-lg">
            ${job.salary}
          </p>
          <img
            src={assets.save_later_icon}
            alt="Save Job"
            className="w-8 h-8 hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;

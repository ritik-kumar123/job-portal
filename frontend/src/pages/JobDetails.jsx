import React, { useContext, useEffect, useState,baseURL } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { jobsData, saveJob, axios } = useContext(AppContext);
  const { id } = useParams();

  const job = jobsData.find((job) => job._id === id);

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsApplied(false); // reset on job change
    setLoading(true);
    const checkIfApplied = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/application/student-applications`
        );
        const appliedJobIds = data.applications.map((app) => app.job._id);
        setIsApplied(appliedJobIds.includes(id));
      } catch (error) {
        console.error("Error checking application status:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) checkIfApplied();
  }, [id, axios]);

  const handleApplyJob = async () => {
    try {
      const { data } = await axios.post(
        `${baseURL}/application/apply/${job._id}`
      );
      if (data.success) {
        setIsApplied(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!job) {
    return (
      <div className="py-20 text-center text-red-600 font-semibold">
        Job not found.
      </div>
    );
  }

  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
        Job Details
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10 gap-10">
        {/* Left Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-5">
            <img
              src={`${baseURL}/uploads/${job.company.logo}`}
              alt=""
              className="w-[86px] h-[86px]"
            />
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">{job.title}</h2>
              <p className="text-xs sm:text-base">
                at {job.company.name}
                <span className="bg-green-200/40 p-1 rounded ml-2">
                  {job.type}
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="my-2 flex flex-col gap-4">
            <h4 className="text-lg text-gray-800 font-semibold">
              Job Description
            </h4>
            <p>{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="my-1 flex flex-col gap-4">
            <h4 className="text-lg text-gray-800 font-semibold">
              Job Requirements
            </h4>
            <ul className="list-disc">
              {job.requirements.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="my-1 flex flex-col gap-3">
            <h4 className="text-lg text-gray-800 font-semibold">
              Job Benefits
            </h4>
            <ul className="list-disc">
              {job.benefits.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col">
          <div className="flex gap-4">
            <div onClick={() => saveJob(job)}>
              <img
                src={assets.save_later_icon}
                alt=""
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={handleApplyJob}
              disabled={loading || isApplied}
              className={`cursor-pointer px-10 py-1 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary"
              } transition text-white rounded-full`}
            >
              {loading ? "Checking..." : isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>

          {/* Salary & Location */}
          <div className="my-5 flex flex-wrap gap-3 border border-gray-300 p-4">
            <p className="text-base text-gray-800 font-medium">
              Salary: ${job.salary}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-base text-gray-800">Job Location:</p>
              <p>{job.location}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="my-1 flex flex-col gap-3 border border-gray-300 p-4">
            <p className="text-xl text-gray-800 font-bold">Job Overview</p>
            <div className="flex flex-wrap items-center gap-2">
              <p>
                Posted Date:{" "}
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>Job Level: {job.jobLevel}</p>
              <p>Education: {job.education}</p>
              <p>Experience: {job.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

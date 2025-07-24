import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobsData } = useContext(AppContext);

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
        Featured Jobs
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {jobsData?.length > 0 ? (
          jobsData.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No jobs available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;

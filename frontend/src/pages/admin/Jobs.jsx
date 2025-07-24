import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Jobs() {
  const { jobsData } = useContext(AppContext);
  return (
    <div className="py-16 px-4 container  mx-auto  bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">
        All Jobs
      </h1>
      {!jobsData || jobsData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No Job Found</div>
        </div>
      ) : (
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job title
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobsData.map((job, index) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
                    key={index}
                    // onClick={() => navigate(`/job/${job._id}`)}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.company.name}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.type}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.location}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.salary}
                      </div>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;

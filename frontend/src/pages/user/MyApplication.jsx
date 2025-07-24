import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function MyApplication() {
  const { axios, navigate } = useContext(AppContext);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/application/student-applications"
      );
      if (data.success) {
        setAppliedJobs(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="py-16 px-4 container mx-auto bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">
        Applied Jobs
      </h1>
      {!appliedJobs || appliedJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No Job Applied</div>
          <p className="text-gray-400 mt-4">
            Your Job applications will appear here once you start applying.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
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
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appliedJobs.map((application, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
                    onClick={() => navigate(`/job/${application.job?._id}`)}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.job?.title || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.job?.company?.name || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.job?.type || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.job?.location || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${application.job?.salary || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {application.status || "Pending"}
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

export default MyApplication;

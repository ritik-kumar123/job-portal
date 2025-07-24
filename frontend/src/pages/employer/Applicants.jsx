import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Applicants() {
  const { axios , baseURL} = useContext(AppContext);
  const [applicantsData, setApplicantsData] = useState([]);

  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/application/employer-job-applicants`
      );
      if (data.success) {
        setApplicantsData(data.applications);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applicants"
      );
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await axios.put(
        `${baseURL}/application/update-status/${id}`,
        { status }
      );
      if (data.success) {
        fetchApplicants();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="py-16 px-4 container mx-auto bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">
        All Applicants
      </h1>
      {!applicantsData || applicantsData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No Applicants Found</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Job
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Date
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicantsData
                  .filter((item) => item.applicants && item.job)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.applicants?.name || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.applicants?.email || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.applicants?.phone || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.job?.title || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {item.applicants?.resume ? (
                          <a
                            href={`${baseURL}/uploads/${item.applicants.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Resume
                          </a>
                        ) : (
                          <span className="text-gray-400">Not Uploaded</span>
                        )}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
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

export default Applicants;

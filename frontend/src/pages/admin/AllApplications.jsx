import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

function AllApplicants() {
  const { applicantsData ,baseURL } = useContext(AppContext);

  useEffect(() => {

  }, [applicantsData]);

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
                    Resume
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Job
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Date
                  </th>

                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicantsData.map((item, index) => (
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
                       <a
                        href={`${baseURL}/uploads/${item.applicants?.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        resume
                      </a>
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
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {item.status || "pending"}
                      </span>
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

export default AllApplicants;

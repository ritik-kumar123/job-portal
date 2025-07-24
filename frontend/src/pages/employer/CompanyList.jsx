import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function CompanyList() {
  const { navigate, axios } = useContext(AppContext);
  const [companyData, setCompanyData] = useState([]);

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/company/get-employer-companies"
      );
      if (data.success) {
        setCompanyData(data.companies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch companies"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/company/delete/${id}`
      );
      if (data.success) {
        setCompanyData((prev) => prev.filter((company) => company._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting company");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Company List
        </h2>
        <button
          onClick={() => navigate("/employer/add-company")}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Company
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 text-sm text-gray-600 font-medium">
                Logo
              </th>
              <th className="text-left p-3 text-sm text-gray-600 font-medium">
                Name
              </th>
              <th className="text-left p-3 text-sm text-gray-600 font-medium">
                About
              </th>
              <th className="text-left p-3 text-sm text-gray-600 font-medium">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {companyData.map((company) => (
              <tr key={company._id} className="hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`http://localhost:4000/uploads/${company.logo}`}
                    alt=""
                    className="w-14 h-14 object-cover border rounded"
                  />
                </td>
                <td className="p-3 text-sm text-gray-800">{company.name}</td>
                <td className="p-3 text-sm text-gray-600">{company.about}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyList;

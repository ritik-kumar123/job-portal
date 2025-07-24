import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function AllCompanies() {
  const { companyData } = useContext(AppContext);

  return (
    <div className="container mx-auto px-6 mt-10 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800 md:text-4xl">
          Company List
        </h2>
   
      </div>
      <table className="w-full border border-gray-300 overflow-hidden rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="test-left p-3 border-b">Logo</th>
            <th className="test-left p-3 border-b">Name</th>
            <th className="test-left p-3 border-b">About</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {companyData.map((company) => {
            return (
              <tr key={company._id} className="hover:bg-gray-50 ">
                <td className="p-3 border-b ">
                  <img
                    src={`http://localhost:4000/uploads/${company.logo}`}
                    alt=""
                    className="w-16 h-16 ml-3 object-cover border"
                  />
                </td>
                <td className="p-3 border-b text-center">{company.name}</td>
                <td className="p-3 border-b text-center">{company.about}</td>
                <td className="p-3 border-b text-center">
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllCompanies;

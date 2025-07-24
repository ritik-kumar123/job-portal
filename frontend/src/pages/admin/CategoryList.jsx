import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function CategoryList() {
    const {categoriesData,setCategoriesData,axios,baseURL}=useContext(AppContext)
    const handleDelete = async (id) => {
        try {
          await axios.delete(`${baseURL}/category/delete/${id}`);
          setCategoriesData(categoriesData.filter((category) => category._id !== id));
          toast.success("Category deleted successfully");
        } catch (error) {
          const message = error?.response?.data?.message || "Something went wrong";
          toast.error(message);
        }
    }
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Categories
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">Logo</th>
              <th className="py-3 px-4 border-b">Category Name</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  <img
                    src={`${baseURL}/uploads/${category.logo}`}
                    alt="category logo"
                    className="w-12 h-12 rounded object-cover border"
                  />
                </td>
                <td className="py-3 px-4 border-b font-medium text-gray-700">
                  {category.name}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 active:scale-95 transition"
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

export default CategoryList

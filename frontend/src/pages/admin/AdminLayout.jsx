import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Menu, X } from "lucide-react"; // icon library

const AdminLayout = () => {
  const { navigate, setAdmin, axios, baseURL} = useContext(AppContext);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const sidebarLinks = [
    { name: "Categories", path: "/admin" },
    { name: "Add Category", path: "/admin/add-category" },
    { name: "Companies", path: "/admin/all-companies" },
    { name: "Applications", path: "/admin/all-applications" },
    { name: "All Users", path: "/admin/all-users" },
    { name: "Jobs", path: "/admin/jobs" },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/auth/logout`);
      if (data.success) {
        setAdmin(false);
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/admin">
          <img src={assets.logo} alt="Logo" className="h-8" />
        </Link>
        <div className="flex items-center gap-5 text-gray-600">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
          {/* Sidebar toggle button for small screens */}
          <button
            className="md:hidden"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            {showSidebar ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full z-40 bg-white shadow-md md:shadow-none border-r border-gray-300 transition-transform transform md:translate-x-0 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:w-64 w-64`}
        >
          <div className="pt-16 md:pt-4">
            {sidebarLinks.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`block py-3 px-5 transition-colors ${
                  index === 0
                    ? "bg-indigo-100 text-indigo-600 border-l-4 border-indigo-500"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setShowSidebar(false)} // auto-close on mobile
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );  
};

export default AdminLayout;

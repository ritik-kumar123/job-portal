import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-red-100 text-red-800",
    "bg-teal-100 text-teal-800",
  ];

  const { categoriesData } = useContext(AppContext);

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
        Most Popular Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        {categoriesData?.map((item, index) => {
          const colorClass = colors[index % colors.length];
          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-transform hover:scale-[1.03] ${colorClass}`}
            >
              <img
                src={`http://localhost:4000/uploads/${item.logo}`}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div className="flex flex-col">
                <h3 className="text-base md:text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base">
                  {item.positions} open positions
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

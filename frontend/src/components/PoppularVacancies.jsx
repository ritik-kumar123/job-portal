import React from "react";
import { vacancies } from "../assets/assets";

const PoppularVacancies = () => {
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

  return (
    <div className="py-16 px-4 md:px-8 ">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
        Most Popular Vacancies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        {vacancies.map((item, index) => {
          const colorClass = colors[index % colors.length];
          return (
            <div
              key={index}
              className={`flex flex-col items-center text-center justify-center gap-2 p-4 rounded-2xl shadow-md border border-gray-200 transition-transform hover:scale-[1.03] hover:shadow-lg ${colorClass}`}
            >
              <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
              <p className="text-sm md:text-base">
                {item.count} open vacancies
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoppularVacancies;

import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function AllUsers() {
  const { axios ,baseURL} = useContext(AppContext);
  const [students, setStudents] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/user/all-students`
      );
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchAllUsers();
  }, []);

  return (
    <div className="p-4  bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl font-medium text-gray-800 mb-4">Students List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="p-4 py-2">#</th>
              <th className="p-4 py-2">Image</th>
              <th className="p-4 py-2">Name</th>
              <th className="p-4 py-2">Email</th>
              <th className="p-4 py-2">Phone</th>
              <th className="p-4 py-2">Location</th>
              <th className="p-4 py-2">Education</th>
              <th className="p-4 py-2">Exp</th>
              <th className="p-4 py-2">Skills</th>
              <th className="p-4 py-2">Bio</th>
              <th className="p-4 py-2">Resume</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {students.map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="p-4 py-2">{index + 1}</td>
                <td className="p-4 py-2">
                  {student.image ? (
                    <img
                      src={`${baseURL}/uploads/${student.image}`}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="p-4 py-2">{student.name}</td>
                <td className="p-4 py-2">{student.email}</td>
                <td className="p-4 py-2">{student.phone}</td>
                <td className="p-4 py-2">{student.location}</td>
                <td className="p-4 py-2">{student.education}</td>
                <td className="p-4 py-2">{student.experience}</td>
                <td className="p-4 py-2">{student.skills}</td>
                <td className="p-4 py-2">{student.bio}</td>
                <td className="p-4 py-2">
                  {student.resume ? (
                    <a
                      href={`${baseURL}/uploads/${student.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;

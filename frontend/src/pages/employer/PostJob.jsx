import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function PostJob() {
  const { navigate, axios ,baseURL } = useContext(AppContext);

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    requirements: "",
    benefits: "",
    jobLevel: "",
    education: "",
    experience: "",
  });

  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/company/get-employer-companies`
      );
      if (data.success) {
        setCompanies(data.companies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch companies"
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${baseURL}/job/post`,
        jobData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/employer/jobs-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8 text-gray-700"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Post a New Job
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Company */}
      <div className="mb-4">
        <label htmlFor="company">Company</label>
        <select
          name="company"
          id="company"
          value={jobData.company}
          onChange={handleChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        >
          <option value="">Select a company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows={3}
          value={jobData.description}
          onChange={handleChange}
          required
          placeholder="Job responsibilities and details"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder="e.g. Mumbai, Remote"
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Salary */}
      <div className="mb-4">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          placeholder="e.g. ₹8 LPA"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Type */}
      <div className="mb-4">
        <label htmlFor="type">Job Type</label>
        <select
          name="type"
          value={jobData.type}
          onChange={handleChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        >
          <option value="">Select job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <label htmlFor="requirements">Requirements</label>
        <textarea
          name="requirements"
          rows={2}
          value={jobData.requirements}
          onChange={handleChange}
          placeholder="e.g. JavaScript, React, Node.js"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <label htmlFor="benefits">Benefits</label>
        <textarea
          name="benefits"
          rows={2}
          value={jobData.benefits}
          onChange={handleChange}
          placeholder="e.g. Health insurance, Flexible hours"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Job Level */}
      <div className="mb-4">
        <label htmlFor="jobLevel">Job Level</label>
        <input
          type="text"
          name="jobLevel"
          value={jobData.jobLevel}
          onChange={handleChange}
          placeholder="e.g. Senior, Mid-Level"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Education */}
      <div className="mb-4">
        <label htmlFor="education">Education</label>
        <input
          type="text"
          name="education"
          value={jobData.education}
          onChange={handleChange}
          placeholder="e.g. B.Tech, B.Sc"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Experience */}
      <div className="mb-6">
        <label htmlFor="experience">Experience</label>
        <input
          type="text"
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          placeholder="e.g. 2 years"
          className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition active:scale-95"
      >
        Post Job
      </button>
    </form>
  );
}

export default PostJob;

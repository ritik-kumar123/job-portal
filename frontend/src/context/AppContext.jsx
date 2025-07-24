import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //backend url
const baseURL = import.meta.env.VITE_API_URL;
  // ✅ Load from localStorage initially
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : false;
  });

  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem("admin") === "true";
  });

  const [categoriesData, setCategoriesData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [query, setQuery] = useState("");

  const [savedJobs, setSavedJobs] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]);

  // ✅ Get currently logged-in user from backend and sync with localStorage
  const fetchloggedInuser = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/user/me`);
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          setAdmin(true);
          localStorage.setItem("admin", "true");
        } else {
          setAdmin(false);
          localStorage.removeItem("admin");
        }
      }
    } catch (error) {
      setUser(false);
      setAdmin(false);
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      toast.error(error?.response?.data?.message || "Login required");
    }
  };

  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/application/all-applications`
      );
      if (data.success) {
        setApplicantsData(data.applications);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching applicants"
      );
    }
  };

  const fetchCampanies = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/company/all`);
      if (data.success) {
        setCompanyData(data.companies);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching companies");
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/category/all`);
      if (data.success) {
        setCategoriesData(data.categories);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching categories"
      );
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/job/all`);
      if (data.success) {
        setJobsData(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching jobs");
    }
  };

  const saveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.find((item) => item._id === job._id);
      if (exists) {
        return prev.filter((item) => item._id !== job._id);
      } else {
        return [...prev, job];
      }
    });
    toast.success("Job saved successfully");
  };

  // ✅ Logout helper
  const logout = () => {
    setUser(false);
    setAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  // ✅ Load on mount
  useEffect(() => {
    fetchloggedInuser();
    fetchApplicants();
    fetchCampanies();
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    navigate,
    user,
    admin,
    setUser,
    setAdmin,
    categoriesData,
    setCategoriesData,
    query,
    setQuery,
    jobsData,
    fetchCategory,
    fetchJobs,
    savedJobs,
    saveJob,
    companyData,
    setCompanyData,
    applicantsData,
    baseURL,
    axios,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { navigate, setUser, setAdmin, axios, baseURL } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/auth/login`,
        formData
      );
      const data = response.data;

      if (data.success) {
        toast.success("Login successful!");

        // Store user in state and localStorage
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          setAdmin(true);
          localStorage.setItem("admin", "true");
          console.log("hello")
          navigate("/admin");
        } else if (data.user.role === "employer") {
          setAdmin(false);
          localStorage.removeItem("admin");
          navigate("/employer");
        } else {
          setAdmin(false);
          localStorage.removeItem("admin");
          navigate("/");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-8 rounded-xl shadow-md w-full bg-gradient-to-r  max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none  border-gray-500/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none border-gray-500/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-2 px-4 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 underline">
              Signup Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

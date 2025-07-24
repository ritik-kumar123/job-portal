import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function AddCompany() {
  const { navigate ,axios ,baseURL} = useContext(AppContext);
  const [companyData, setCompanyData] = useState({
    name: "",
    about: "",
    logo: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCompanyData({ ...companyData, logo: selectedFile });
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", companyData.name);
      formData.append("about", companyData.about);
      formData.append("logo", companyData.logo);

      const { data } = await axios.post(
        `${baseURL}/company/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/employer");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center max-w-4xl w-full mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded 
       shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-medium text-gray-800">
          Register a new Company{" "}
        </h2>
        <div className="w-full my-4">
          {preview && (
            <div className="mb-3 flex justify-center">
              <img
                src={preview}
                alt=""
                className="w-24 h-24 object-cover rounded-full border shadow"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
         file:mr-4 file:py-2 file:px-4
        file:rounded-full file-border-0
         file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
         hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
        <label htmlFor="name">Company Name</label>
        <input
          type="text"
          name="name"
          value={companyData.name}
          id="name"
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border mt-1 py-2.5 px-4 outline-none
       border-gray-500/30 rounded focus:border-indigo-500"
        />

        <div className="mb-4">
          <label htmlFor="about">About</label>
          <textarea
            rows={4}
            type="text"
            name="about"
            value={companyData.about}
            id="about"
            onChange={handleChange}
            placeholder="Enter about"
            className="w-full border mt-1 py-2.5 px-4 outline-none
           border-gray-500/30 rounded focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full my-3 bg-primary 
         active:scale-95 transition py-2.5 rounded text-white">
          Add Company</button>
      </form>
    </div>
  );
}

export default AddCompany;

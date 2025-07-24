import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
function Profile() {
   const {user,axios,setUser ,baseURL} = useContext(AppContext)
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        education:"",
        location:"",
        experience:"",
        skills:"",
        about:"",
        profileImage:null,
        resume:null,
    });

    const handleChange = (e) => {
        const {name,value,files} = e.target;
        if(files)
        {
            setFormData({...formData,[name]:files[0]});
        }
        else
        {
            setFormData({...formData,[name]:value});
        }
    }
    useEffect(()=>{
      if(user)
      {
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          education: user.education,
          experience: user.experience,
          skills: user.skills,
          about: user.bio,
          resume: user.resume,
          profileImage: user.image,
        });
      }
    },[user])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try
        {
           const formPayload = new FormData();
           formPayload.append("name",formData.name);
           formPayload.append("email",formData.email);
           formPayload.append("phone",formData.phone);
           formPayload.append("location",formData.location);
           formPayload.append("education",formData.education);
           formPayload.append("experience",formData.experience);
           formPayload.append("skills",formData.skills);
           formPayload.append("about",formData.about);
           formPayload.append("resume",formData.resume);
           formPayload.append("profileImage",formData.profileImage);

           const {data}= await axios.put(`${baseURL}/user/update-profile/${user._id}`,
             formPayload,
            {
              headers:
              {
                   "Content-Type":"multipart/form-data",
              },
            }
           );
           if(data.success)
           {
            setUser(data.user);
            toast.success(data.message);
           }

        }
        catch(error)
        {
          toast.error(error.response.data.message)
        }
    }


  return (
    <div className="container   mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.profileImage && (
          <img
            src={`${baseURL}/uploads/${formData.profileImage}`}
            alt=""
            className="w-24 h-24 object-cover rounded-full mb-4"
          />
        )}
        <div>
          <label className="block mb-1 font-semibold">Profile Image</label>
          <input type="file" name="profileImage" onChange={handleChange} />
        </div>
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* Email*/}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* Location  */}
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* Education */}
        <div>
          <label className="block mb-1 font-semibold">Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* Experience */}
        <div>
          <label className="block mb-1 font-semibold">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        {/* skills */}
        <div>
          <label className="block mb-1 font-semibold">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="React,Node.js,MonoDB"
          ></textarea>
        </div>
        {/* About Me */}
        <div>
          <label className="block mb-1 font-semibold">About Me</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Tell us something about yourself..."
          ></textarea>
        </div>
        {/* resume */}
        <div>
          <label className="block mb-1 font-semibold">Resume(PDF/DOC)</label>
          <input type="file" name="resume" onChange={handleChange} />
        </div>
        {formData.resume && (
          <div className='mt-2'>
            <a href={`${baseURL}/uploads/${formData.resume}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
            >View Resume</a>
          </div>
        )}
        {/* button */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile


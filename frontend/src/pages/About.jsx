import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="py-16 container  mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* left section */}
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
        {/* right section */}
        <div>
          <h2 className="text-3xl  font-semibold text-gray-800">
            About Our Job Portal
          </h2>
          <p className="mb-4 text-gray-600 leading-relaxed">
            {" "}
            Our job portal connects talented individuals with leading companies,
            offering diverse opportunities for career advancement. We are
            committed to providing an intuitive platform that enables job
            seekers to explore and apply for roles that match their skills and
            goals.
          </p>
          <p className="mb-4 text-gray-600 leading-relaxed">
            {""}
            Our mission is to equip job seekers with the resources they need to
            excel in their professional journey. We believe in fostering
            connections that empower individuals to achieve their career
            aspirations.
          </p>
        </div>
      </div>

      <div className='mt-12 bg-gray-100 rounded-xl p-6 shadow-inner'>
        <h3 className='text-2xl mb-3 font-semibold text-gray-700'>Why Choose Us?</h3>
        <p className='text-gray-600'>Thousands of verified jobs are waiting for you to apply.
          <br />
          Easy application process. <br /> Personalized job recommendations.
          <br/> Secure and trustworthy platform.
        </p>
      </div>

    </div>
  );
}

export default About


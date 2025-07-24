import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import JobCard from '../components/JobCard';

const AllJobs = () => {
  const {jobsData,query} =useContext(AppContext)
  const filteredJobs = jobsData.filter((job) => job.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
        Available Jobs
      </h1>
      <div className="my-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-12">
        {filteredJobs?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default AllJobs
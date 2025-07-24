import React from 'react'
import { Routes ,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AllJobs from './pages/AllJobs'
import JobDetails from './pages/JobDetails'
import About from './pages/About'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import MyApplication from './pages/user/MyApplication'
import Profile from './pages/user/Profile'
import EmployerLayout from './pages/employer/EmployerLayout'
import CompanyList from './pages/employer/CompanyList'
import AddCompany from './pages/employer/AddCompany'
import PostJob from './pages/employer/PostJob'
import JobsList from './pages/employer/JobsList'
import Applicants from './pages/employer/Applicants'
import CategoryList from './pages/admin/CategoryList'
import AdminLayout from './pages/admin/AdminLayout'
import AddCategory from './pages/admin/AddCategory'
import AllCompanies from './pages/admin/AllCompanies'
import AllApplications from './pages/admin/AllApplications'
import AllUsers from './pages/admin/AllUsers'
import Jobs from './pages/admin/Jobs'
import EmployerRoute from './routes/EmployerRoute'
import AdminRoute from './routes/AdminRoute'
const App = () => {
  const adminPath = useLocation().pathname.includes("admin");
  const login = useLocation().pathname.includes("login");
  const signup = useLocation().pathname.includes("signup");

  const employerPath = useLocation().pathname.includes("employer");
  return (
    <>
      <div className="container  mx-auto pt-4">
        {adminPath || employerPath  ? null : <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ============== user routes ============= */}
          <Route path="/my-application" element={<MyApplication />} />
          <Route path="/profile" element={<Profile />} />

          {/* ============== Employer routes ============= */}
          <Route path="/employer" element={<EmployerRoute><EmployerLayout/></EmployerRoute>}>
            <Route index element={<CompanyList />} />
            <Route path="add-company" element={<AddCompany />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="jobs-list" element={<JobsList />} />
            <Route path="applicants" element={<Applicants />} />
          </Route>

          {/* ============== admin routes ============= */}
          <Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}>
            <Route index element={<CategoryList />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="all-companies" element={<AllCompanies />} />
            <Route path="all-applications" element={<AllApplications />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="jobs" element={<Jobs />} />
          </Route>
        </Routes>
        {adminPath || employerPath || login || signup ? null : <Footer />}
        <Toaster />
      </div>
    </>
  );
}

export default App
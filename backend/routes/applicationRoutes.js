import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { applyJob, getAllApplications, getEmployerJobApplicants, getStudentApplications, updateApplicationStatus } from "../controllers/applicationController.js";
// import { isAdmin } from "../middlewares/isAdmin.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";



const applicationRouter = express.Router();

applicationRouter.post("/apply/:jobId", isAuthenticated,authorizeRoles("student"), applyJob);
applicationRouter.get("/student-applications", isAuthenticated,authorizeRoles("admin,student"), getStudentApplications);
applicationRouter.get("/employer-job-applicants", isAuthenticated,authorizeRoles("employer"), getEmployerJobApplicants);
applicationRouter.get("/all-applications", isAuthenticated,getAllApplications);
applicationRouter.put("/update-status/:applicationId", isAuthenticated,authorizeRoles("employer"),updateApplicationStatus);

export default applicationRouter;
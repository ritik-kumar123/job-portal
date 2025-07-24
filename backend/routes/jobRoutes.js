import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { deleteJob, getAllJobs, getEmployerJobs, postJob } from "../controllers/jobController.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";

const jobRouter= express.Router();

jobRouter.post("/post", isAuthenticated,authorizeRoles("employer"), postJob);
jobRouter.get("/employer-jobs", isAuthenticated,authorizeRoles("employer"), getEmployerJobs);
jobRouter.get("/all", getAllJobs);
jobRouter.delete("/delete/:id", isAuthenticated,authorizeRoles("employer,admin"),deleteJob);

export default jobRouter;

import express from "express";
import { 
  addCompany, 
  deleteCompany, 
  getAllCompanies, 
  getEmployerCompanies 
} from "../controllers/companyController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";

const companyRouter = express.Router();

companyRouter.post("/add", isAuthenticated, authorizeRoles("employer"), upload.single("logo"), addCompany);
companyRouter.get("/get-employer-companies", isAuthenticated, authorizeRoles("employer"), getEmployerCompanies);
companyRouter.get("/all", isAuthenticated, getAllCompanies);
companyRouter.delete("/delete/:id", isAuthenticated, authorizeRoles("employer", "admin"), deleteCompany);

export default companyRouter;

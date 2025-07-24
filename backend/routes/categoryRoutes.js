import express from "express";
import { addCategory, deleteCategory, getCategories, } from "../controllers/categoryController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
// import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";
const categoryRouter = express.Router();

categoryRouter.post("/add", isAuthenticated,authorizeRoles("admin"),upload.single("logo"), addCategory)
categoryRouter.get("/all", getCategories);
categoryRouter.delete("/delete/:id", isAuthenticated, authorizeRoles("admin"), deleteCategory);
export default categoryRouter;
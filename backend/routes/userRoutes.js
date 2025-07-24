import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {getAllStudents,getLoggedInUser,updateProfile,} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";

const userRouter = express.Router();
userRouter.get("/me", isAuthenticated, getLoggedInUser);
userRouter.put("/update-profile/:id", isAuthenticated,upload.fields([{ name: "profileImage", maxCount: 1 },{ name: "resume", maxCount: 1 } ]),updateProfile);
userRouter.get("/all-students", isAuthenticated,authorizeRoles("admin"),getAllStudents);

export default userRouter;

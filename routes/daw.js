import { createAdmin, getAllAdmin } from "../controllers/admin.js";
import { createUser, roleCheck } from "../controllers/common.js";
import express from "express";

import { getAllStudent, createStudent } from "../controllers/student.js";
import { createTeacher, getAllTeacher } from "../controllers/teacher.js";
import { createSubject, getAllSubject } from "../controllers/subject.js";
import { isAdmin, isAdminTeacher, isTeacher } from "../middleware/auth.js";
import {
  createPractical,
  enrollStudentInPractical,
  getAllPracticals,
} from "../controllers/practical.js";

const router = express.Router();

//Admin
router.post("/createAdmin", createAdmin);

router.get("/getAllAdmin", getAllAdmin);

router.post("/createSubject", isAdmin, createSubject);
router.get("/getAllSubject", getAllSubject);

//Student
router.post("/createStudent", createStudent);

router.get("/getAllStudent", getAllStudent, isAdminTeacher);

//teacher
router.post("/createTeacher", createTeacher);
router.get("/getTeacher", getAllTeacher);

//common
router.get("/roleCheck", roleCheck);
router.post("/createUser", createUser);

//Pratical
router.post("/createPractical", createPractical, isTeacher);
router.get("/practicals/get", getAllPracticals);
router.post("/practicals/enroll", enrollStudentInPractical);

export default router;

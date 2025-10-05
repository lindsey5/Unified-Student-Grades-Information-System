import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getAllCourses, getTotalCourses } from "../controllers/courseController";
import { adminRequireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', adminRequireAuth, createCourse);
router.get('/', getAllCourses);
router.get('/total', getTotalCourses);
router.put('/:id', adminRequireAuth, editCourse);
router.delete('/:id', adminRequireAuth, deleteCourse);

const courseRoutes = router;

export default courseRoutes;
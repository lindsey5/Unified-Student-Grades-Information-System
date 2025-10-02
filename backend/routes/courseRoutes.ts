import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getAllCourses, getTotalCourses } from "../controllers/courseController";

const router = Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/total', getTotalCourses);
router.put('/:id', editCourse);
router.delete('/:id', deleteCourse);

const courseRoutes = router;

export default courseRoutes;
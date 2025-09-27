import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getAllCourses } from "../controllers/courseController";

const router = Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.put('/:id', editCourse);
router.delete('/:id', deleteCourse);

const courseRoutes = router;

export default courseRoutes;
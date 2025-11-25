import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getAllCourses, getTotalCourses } from "../controllers/courseController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin'), createCourse);
router.get('/', getAllCourses);
router.get('/total',requireAuth('admin', 'registrar'),  getTotalCourses);
router.put('/:id', requireAuth('admin'), editCourse);
router.delete('/:id', requireAuth('admin'), deleteCourse);

const courseRoutes = router;

export default courseRoutes;
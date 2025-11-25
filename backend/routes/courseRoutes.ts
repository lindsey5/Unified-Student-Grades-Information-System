import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getAllCourses, getTotalCourses } from "../controllers/courseController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createCourse);
router.get('/', getAllCourses);
router.get('/total',requireAuth('admin', 'registrar'),  getTotalCourses);
router.put('/:id', requireAuth('admin', 'registrar'), editCourse);
router.delete('/:id', requireAuth('admin', 'registrar'), deleteCourse);

const courseRoutes = router;

export default courseRoutes;
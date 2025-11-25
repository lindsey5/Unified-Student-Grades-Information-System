import { Router } from "express";
import { createSemester, deleteSemester, getAuthenticatedSemesters, getStudentSemesters } from "../controllers/semesterController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createSemester);
router.get('/', requireAuth('student'), getAuthenticatedSemesters);
router.get('/:id', requireAuth('admin', 'student', 'registrar'), getStudentSemesters);
router.delete('/:id', requireAuth('admin', 'registrar'), deleteSemester);

const semesterRoutes = router;

export default semesterRoutes;
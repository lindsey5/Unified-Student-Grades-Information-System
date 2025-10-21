import { Router } from "express";
import { createSemester, deleteSemester, getAuthenticatedSemesters, getStudentSemesters } from "../controllers/semesterController";
import { studentRequireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', createSemester);
router.get('/', studentRequireAuth, getAuthenticatedSemesters);
router.get('/:id', getStudentSemesters);
router.delete('/:id', deleteSemester);

const semesterRoutes = router;

export default semesterRoutes;
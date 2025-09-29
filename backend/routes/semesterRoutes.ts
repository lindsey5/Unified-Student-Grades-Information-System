import { Router } from "express";
import { createSemester, deleteSemester, getStudentSemester } from "../controllers/semesterController";

const router = Router();

router.post('/', createSemester);
router.get('/:id', getStudentSemester);
router.delete('/:id', deleteSemester);

const semesterRoutes = router;

export default semesterRoutes;
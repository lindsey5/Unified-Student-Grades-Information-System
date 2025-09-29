import { Router } from "express";
import { createStudentSubject, getStudentSubjects } from "../controllers/studentSubjectController";
const router = Router();

router.post('/', createStudentSubject);
router.get('/:id', getStudentSubjects);

const studentSubjectRoutes = router;

export default studentSubjectRoutes;
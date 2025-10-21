import { Router } from "express";
import { createStudentSubject, deleteStudentSubject, editStudentSubject, getAuthenticatedStudentSubjects, getStudentSubjects } from "../controllers/studentSubjectController";
import { studentRequireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', createStudentSubject);
router.get('/', studentRequireAuth, getAuthenticatedStudentSubjects);
router.get('/:id', getStudentSubjects);
router.put('/:id', editStudentSubject);
router.delete('/:id', deleteStudentSubject);

const studentSubjectRoutes = router;

export default studentSubjectRoutes;
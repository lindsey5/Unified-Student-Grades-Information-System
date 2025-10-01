import { Router } from "express";
import { createStudentSubject, deleteStudentSubject, editStudentSubject, getStudentSubjects } from "../controllers/studentSubjectController";
const router = Router();

router.post('/', createStudentSubject);
router.get('/:id', getStudentSubjects);
router.put('/:id', editStudentSubject);
router.delete('/:id', deleteStudentSubject);

const studentSubjectRoutes = router;

export default studentSubjectRoutes;
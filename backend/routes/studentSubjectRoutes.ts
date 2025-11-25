import { Router } from "express";
import { createStudentSubject, deleteStudentSubject, editStudentSubject, getAuthenticatedStudentSubjects, getStudentSubjects } from "../controllers/studentSubjectController";
import { requireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createStudentSubject);
router.get('/', requireAuth('student'), getAuthenticatedStudentSubjects);
router.get('/:id', requireAuth('admin', 'registrar'), getStudentSubjects);
router.put('/:id', requireAuth('admin', 'registrar'), editStudentSubject);
router.delete('/:id', requireAuth('admin', 'registrar'), deleteStudentSubject);

const studentSubjectRoutes = router;

export default studentSubjectRoutes;
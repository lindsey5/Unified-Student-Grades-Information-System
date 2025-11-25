import { Router } from "express";
import { changeStudentPassword, createStudent, deleteStudent, editStudent, getAllStudents, getOverallStudentRankings, getRecentStudents, getStudentById, getStudentCountPerYearLevel, getStudentData, getStudentGenderCount, getTotalStudent } from "../controllers/studentController";
import { requireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createStudent);
router.post('/password', requireAuth('student'), changeStudentPassword);
router.get('/', requireAuth('admin', 'registrar'), getAllStudents);
router.get('/count', requireAuth('admin', 'registrar'), getStudentCountPerYearLevel);
router.get('/total', requireAuth('admin', 'registrar'), getTotalStudent);
router.get('/recent', requireAuth('admin', 'registrar'), getRecentStudents);
router.get('/gender-count', requireAuth('admin', 'registrar'), getStudentGenderCount);
router.get('/me', requireAuth('student'), getStudentData);
router.get('/ranking', requireAuth('admin', 'registrar', 'student'), getOverallStudentRankings);
router.get('/:id', requireAuth('admin', 'registrar'), getStudentById);
router.put('/:id', requireAuth('admin', 'registrar'), editStudent);
router.delete('/:id', requireAuth('admin', 'registrar'), deleteStudent);

const studentRoutes = router;

export default studentRoutes;
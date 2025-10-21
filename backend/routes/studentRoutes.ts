import { Router } from "express";
import { changeStudentPassword, createStudent, deleteStudent, editStudent, getAllStudents, getRecentStudents, getStudentById, getStudentCountPerYearLevel, getStudentData, getTotalStudent } from "../controllers/studentController";
import { studentRequireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', createStudent);
router.post('/password', changeStudentPassword);
router.get('/', getAllStudents);
router.get('/count', getStudentCountPerYearLevel);
router.get('/total', getTotalStudent);
router.get('/recent', getRecentStudents);
router.get('/data', studentRequireAuth, getStudentData);
router.get('/:id', getStudentById);
router.put('/:id', editStudent);
router.delete('/:id', deleteStudent);

const studentRoutes = router;

export default studentRoutes;
import { Router } from "express";
import { createStudent, deleteStudent, editStudent, getAllStudents, getRecentStudents, getStudentById, getStudentCountPerYearLevel, getTotalStudent } from "../controllers/studentController";
const router = Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/count', getStudentCountPerYearLevel);
router.get('/total', getTotalStudent);
router.get('/recent', getRecentStudents);
router.get('/:id', getStudentById);
router.put('/:id', editStudent);
router.delete('/:id', deleteStudent);

const studentRoutes = router;

export default studentRoutes;
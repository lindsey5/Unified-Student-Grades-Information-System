import { Router } from "express";
import { createStudent, deleteStudent, editStudent, getAllStudents, getStudentById } from "../controllers/studentController";
const router = Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', editStudent);
router.delete('/:id', deleteStudent);

const studentRoutes = router;

export default studentRoutes;
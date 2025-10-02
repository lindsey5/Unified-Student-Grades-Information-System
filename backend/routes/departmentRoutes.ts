import { Router } from "express";
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments, getTotalDepartments } from "../controllers/departmentController";

const router = Router();

router.get('/', getAllDepartments);
router.get('/total', getTotalDepartments);
router.post('/', createDepartment);
router.put('/:id', editDepartment);
router.delete('/:id', deleteDepartment);

const departmentRoutes = router;

export default departmentRoutes;
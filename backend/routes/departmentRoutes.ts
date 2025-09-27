import { Router } from "express";
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments } from "../controllers/departmentController";

const router = Router();

router.get('/', getAllDepartments);
router.post('/', createDepartment);
router.put('/:id', editDepartment);
router.delete('/:id', deleteDepartment);

const departmentRoutes = router;

export default departmentRoutes;
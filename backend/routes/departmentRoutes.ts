import { Router } from "express";
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments, getTotalDepartments } from "../controllers/departmentController";
import { adminRequireAuth } from "../middlewares/authRequire";

const router = Router();

router.get('/', getAllDepartments);
router.get('/total', getTotalDepartments);
router.post('/', adminRequireAuth, createDepartment);
router.put('/:id', adminRequireAuth, editDepartment);
router.delete('/:id', adminRequireAuth, deleteDepartment);

const departmentRoutes = router;

export default departmentRoutes;
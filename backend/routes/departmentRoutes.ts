import { Router } from "express";
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments, getTotalDepartments } from "../controllers/departmentController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.get('/', getAllDepartments);
router.get('/total', requireAuth('admin', 'registrar'), getTotalDepartments);
router.post('/', requireAuth('admin'), createDepartment);
router.put('/:id', requireAuth('admin'), editDepartment);
router.delete('/:id', requireAuth('admin'), deleteDepartment);

const departmentRoutes = router;

export default departmentRoutes;
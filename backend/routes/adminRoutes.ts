import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin, getAllAdmins } from "../controllers/adminController";
import { adminRequireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', adminRequireAuth, createAdmin);
router.get('/all', adminRequireAuth, getAllAdmins);
router.get('/', adminRequireAuth, getAdmin);
router.delete('/:id', adminRequireAuth, deleteAdmin);

const adminRoutes = router;

export default adminRoutes;
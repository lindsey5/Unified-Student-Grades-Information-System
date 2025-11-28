import { Router } from "express";
import { createAdmin, deleteAdmin, editAdmin, editAdminProfile, getAdmin, getAllAdmins } from "../controllers/adminController";
import { requireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', requireAuth('admin'), createAdmin);
router.get('/all', requireAuth('admin'), getAllAdmins);
router.get('/', requireAuth('admin'), getAdmin);
router.put('/', requireAuth('admin'), editAdminProfile);
router.put('/:id', requireAuth('admin'), editAdmin);
router.delete('/:id', requireAuth('admin'), deleteAdmin);

const adminRoutes = router;

export default adminRoutes;
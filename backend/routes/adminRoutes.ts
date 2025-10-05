import { Router } from "express";
import { createAdmin, getAdmin } from "../controllers/adminController";
import { adminRequireAuth } from "../middlewares/authRequire";
const router = Router();

router.post('/', adminRequireAuth, createAdmin);
router.get('/', adminRequireAuth, getAdmin);

const adminRoutes = router;

export default adminRoutes;
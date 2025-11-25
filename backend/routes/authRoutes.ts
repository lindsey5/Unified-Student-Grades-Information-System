import { Router } from "express";
import { requireAuth } from "../middlewares/authRequire";
import { adminLogin, getUser, logout, registrarLogin, studentLogin } from "../controllers/authController";
const router = Router();

router.post('/admin', adminLogin)
router.post('/student', studentLogin);
router.post('/registrar', registrarLogin);
router.get('/user', requireAuth('admin', 'student', 'registrar'), getUser);
router.post('/logout', logout);

const authRoutes = router;

export default authRoutes;
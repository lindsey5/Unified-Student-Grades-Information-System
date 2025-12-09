import { Router } from "express";
import { requireAuth } from "../middlewares/authRequire";
import { adminLogin, forgotPassword, getUser, logout, registrarLogin, resetPassword, studentLogin } from "../controllers/authController";
const router = Router();

router.post('/admin', adminLogin)
router.post('/student', studentLogin);
router.post('/registrar', registrarLogin);
router.get('/user', requireAuth('admin', 'student', 'registrar'), getUser);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

const authRoutes = router;

export default authRoutes;
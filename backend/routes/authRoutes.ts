import { Router } from "express";
import { adminLogin, logout, studentLogin } from "../controllers/authController";
const router = Router();

router.post('/admin', adminLogin)
router.post('/student', studentLogin);
router.post('/logout', logout);

const authRoutes = router;

export default authRoutes;
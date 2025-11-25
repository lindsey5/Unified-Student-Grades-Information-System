import { Router } from "express";
import { createInstructor, getAllInstructors, getTotalInstructors } from "../controllers/instructorController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin'), createInstructor);
router.get('/', requireAuth('admin', 'registrar'), getAllInstructors);
router.get('/total', requireAuth('admin', 'registrar'), getTotalInstructors);

const instructorRoutes = router;

export default instructorRoutes;
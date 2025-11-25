import { Router } from "express";
import { createInstructor, editInstructor, getAllInstructors, getTotalInstructors } from "../controllers/instructorController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createInstructor);
router.get('/', requireAuth('admin', 'registrar'), getAllInstructors);
router.get('/total', requireAuth('admin', 'registrar'), getTotalInstructors);
router.put('/:id', requireAuth('admin', 'registrar'), editInstructor);

const instructorRoutes = router;

export default instructorRoutes;
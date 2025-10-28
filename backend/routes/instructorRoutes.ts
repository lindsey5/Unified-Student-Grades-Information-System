import { Router } from "express";
import { createInstructor, getAllInstructors, getTotalInstructors } from "../controllers/instructorController";

const router = Router();

router.post('/', createInstructor);
router.get('/', getAllInstructors);
router.get('/total', getTotalInstructors);

const instructorRoutes = router;

export default instructorRoutes;
import { Router } from "express";
import { createInstructor, getAllInstructors } from "../controllers/instructorController";

const router = Router();

router.post('/', createInstructor);
router.get('/', getAllInstructors);

const instructorRoutes = router;

export default instructorRoutes;
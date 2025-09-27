import { Router } from "express";
import { createSubject, getAllSubjects } from "../controllers/subjectController";

const router = Router();

router.post('/', createSubject);
router.get('/', getAllSubjects); 

const subjectRoutes = router;

export default subjectRoutes;
import { Router } from "express";
import { createSubject, editSubject, getAllSubjects } from "../controllers/subjectController";

const router = Router();

router.post('/', createSubject);
router.get('/', getAllSubjects); 
router.put('/:id', editSubject);

const subjectRoutes = router;

export default subjectRoutes;
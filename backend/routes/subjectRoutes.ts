import { Router } from "express";
import { createSubject, editSubject, getAllSubjects } from "../controllers/subjectController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin', 'registrar'), createSubject);
router.get('/', requireAuth('admin', 'registrar'), getAllSubjects); 
router.put('/:id', requireAuth('admin', 'registrar'), editSubject);

const subjectRoutes = router;

export default subjectRoutes;
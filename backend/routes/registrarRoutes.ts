import { Router } from "express";
import { createRegistrar, getRegistrar, getRegistrars } from "../controllers/registrarController";
import { requireAuth } from "../middlewares/authRequire";

const router = Router();

router.post('/', requireAuth('admin'), createRegistrar);
router.get('/me', requireAuth('registrar'), getRegistrar);
router.get('/', requireAuth('admin'), getRegistrars);

const registrarRoutes = router;

export default registrarRoutes;
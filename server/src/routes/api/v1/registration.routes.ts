import { Router } from 'express';
import * as registrationController from '../../../controllers/registration.controller';

const router = Router();

router.get('/state/:stateCode', registrationController.getRegistrationInfo);
router.post('/reminder', registrationController.setReminder);
router.post('/register', registrationController.registerVoter);

export default router;

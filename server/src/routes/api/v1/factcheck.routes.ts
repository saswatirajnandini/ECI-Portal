import { Router } from 'express';
import * as factcheckController from '../../../controllers/factcheck.controller';

const router = Router();

router.post('/verify', factcheckController.verifyClaim);

export default router;

import { Router } from 'express';
import * as candidateController from '../../../controllers/candidate.controller';

const router = Router();

router.get('/', candidateController.getCandidates);
router.get('/:id', candidateController.getCandidateById);

export default router;

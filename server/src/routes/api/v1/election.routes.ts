import { Router } from 'express';
import * as electionController from '../../../controllers/election.controller';

const router = Router();

router.get('/timeline', electionController.getTimeline);
router.get('/upcoming', electionController.getUpcoming);

export default router;

import { Router } from 'express';
import * as finderController from '../../../controllers/finder.controller';

const router = Router();

router.get('/local-elections', finderController.getLocalElections);

export default router;

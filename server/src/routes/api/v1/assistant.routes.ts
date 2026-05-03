import { Router } from 'express';
import * as assistantController from '../../../controllers/assistant.controller';

const router = Router();

router.post('/chat', assistantController.chat);
router.get('/history/:conversationId', assistantController.getHistory);

export default router;

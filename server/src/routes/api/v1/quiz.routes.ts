import { Router } from 'express';
import * as quizController from '../../../controllers/quiz.controller';

const router = Router();

router.get('/:moduleId', quizController.getQuiz);
router.post('/submit', quizController.submitQuiz);

export default router;

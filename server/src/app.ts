import express from 'express';
import cors from 'cors';
import electionRoutes from './routes/api/v1/election.routes';
import registrationRoutes from './routes/api/v1/registration.routes';
import factcheckRoutes from './routes/api/v1/factcheck.routes';
import quizRoutes from './routes/api/v1/quiz.routes';
import finderRoutes from './routes/api/v1/finder.routes';
import assistantRoutes from './routes/api/v1/assistant.routes';
import candidateRoutes from './routes/api/v1/candidate.routes';
import newsRoutes from './routes/api/v1/news.routes';

import path from 'path';
import logger from './services/logger.service';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/v1/elections', electionRoutes);
app.use('/api/v1/registration', registrationRoutes);
app.use('/api/v1/factcheck', factcheckRoutes);
app.use('/api/v1/quiz', quizRoutes);
app.use('/api/v1/finder', finderRoutes);
app.use('/api/v1/assistant', assistantRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/news', newsRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ElectIQ API is running' });
});

// Serve Frontend Static Files
const publicPath = path.join(__dirname, '../../electiq-app/dist');
app.use(express.static(publicPath));

// Handle React Routing (Fallthrough)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;

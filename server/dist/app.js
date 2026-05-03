"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const election_routes_1 = __importDefault(require("./routes/api/v1/election.routes"));
const registration_routes_1 = __importDefault(require("./routes/api/v1/registration.routes"));
const factcheck_routes_1 = __importDefault(require("./routes/api/v1/factcheck.routes"));
const quiz_routes_1 = __importDefault(require("./routes/api/v1/quiz.routes"));
const finder_routes_1 = __importDefault(require("./routes/api/v1/finder.routes"));
const assistant_routes_1 = __importDefault(require("./routes/api/v1/assistant.routes"));
const candidate_routes_1 = __importDefault(require("./routes/api/v1/candidate.routes"));
const news_routes_1 = __importDefault(require("./routes/api/v1/news.routes"));
const path_1 = __importDefault(require("path"));
const logger_service_1 = __importDefault(require("./services/logger.service"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    logger_service_1.default.info(`${req.method} ${req.url}`);
    next();
});
// API Routes
app.use('/api/v1/elections', election_routes_1.default);
app.use('/api/v1/registration', registration_routes_1.default);
app.use('/api/v1/factcheck', factcheck_routes_1.default);
app.use('/api/v1/quiz', quiz_routes_1.default);
app.use('/api/v1/finder', finder_routes_1.default);
app.use('/api/v1/assistant', assistant_routes_1.default);
app.use('/api/v1/candidates', candidate_routes_1.default);
app.use('/api/v1/news', news_routes_1.default);
// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'ElectIQ API is running' });
});
// Serve Frontend Static Files
const publicPath = path_1.default.join(__dirname, '../../electiq-app/dist');
app.use(express_1.default.static(publicPath));
// Handle React Routing (Fallthrough)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
// Global Error Handler (must be last)
app.use(error_middleware_1.errorHandler);
exports.default = app;

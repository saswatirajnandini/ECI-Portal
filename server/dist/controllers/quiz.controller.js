"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuiz = exports.getQuiz = void 0;
const getQuiz = (req, res) => {
    const { moduleId } = req.params;
    // Mock quiz data
    const quiz = {
        moduleId,
        difficulty: "medium",
        totalPoints: 100,
        questions: [
            {
                id: "q1",
                text: "What is the minimum age to vote in India?",
                options: ["16", "18", "21", "25"],
                correctOption: 1
            }
        ]
    };
    res.status(200).json(quiz);
};
exports.getQuiz = getQuiz;
const submitQuiz = (req, res) => {
    const { quizId, answers, userId } = req.body;
    // Mock quiz submission
    res.status(200).json({
        score: 100,
        feedback: "Excellent! You got all answers correct.",
        badge: "First-Time Voter Pro"
    });
};
exports.submitQuiz = submitQuiz;

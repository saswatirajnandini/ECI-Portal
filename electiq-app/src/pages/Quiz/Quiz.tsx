import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import './Quiz.css';

const questions = [
  {
    question: "What is the maximum number of members the Lok Sabha can have?",
    options: ["543", "550", "250", "500"],
    correct: 1,
    explanation: "The maximum strength of the Lok Sabha is 550 members, though currently it has 543 elected members."
  },
  {
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
    correct: 2,
    explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
  }
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const q = questions[currentQ];

  return (
    <div className="quiz-page">
      <div className="page-header">
        <h1>Civic IQ Quiz</h1>
        <p>Test your knowledge and earn badges.</p>
      </div>

      <div className="quiz-container">
        <div className="quiz-progress">
          <span className="q-num">Question {currentQ + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <motion.div 
          className="question-card"
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="q-header">
            <Brain size={24} className="saffron" />
            <h2>{q.question}</h2>
          </div>

          <div className="options-grid">
            {q.options.map((opt, idx) => {
              let statusClass = '';
              if (showResult) {
                if (idx === q.correct) statusClass = 'correct';
                else if (idx === selected) statusClass = 'incorrect';
              }

              return (
                <button 
                  key={idx}
                  className={`option-btn ${statusClass} ${selected === idx ? 'selected' : ''}`}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                >
                  <span className="opt-text">{opt}</span>
                  {showResult && idx === q.correct && <CheckCircle2 size={20} />}
                  {showResult && idx === selected && idx !== q.correct && <XCircle size={20} />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div 
              className={`explanation ${selected === q.correct ? 'success' : 'error'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="exp-content">
                <strong>{selected === q.correct ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
              </div>
              <button className="btn-primary" onClick={nextQuestion}>
                {currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

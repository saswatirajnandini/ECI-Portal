import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { useAssistantStore } from '../../store/assistantStore';
import { sendChatMessage } from '../../services/gemini';
import './Assistant.css';

const quickActions = [
  { label: 'How to register for voting?' },
  { label: 'What is a voter ID (EPIC)?' },
  { label: 'Find my polling booth' },
  { label: 'Check election dates' },
];

export default function Assistant() {
  const { messages, addMessage } = useAssistantStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    addMessage({ role: 'user', content: msg, timestamp: new Date() });
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(messages, `Respond to this question about Indian Elections as an official ECI assistant:\n\n${msg}`);
      addMessage({ role: 'assistant', content: response, timestamp: new Date() });
    } catch {
      addMessage({
        role: 'assistant',
        content: 'Sorry, I couldn\'t process that. Please try again.',
        timestamp: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="assistant-page">
      <div className="assistant-container">
        
        {/* Header Area */}
        <div className="assistant-header">
          <span className="eyebrow">AI ASSISTANT</span>
          <h1>How can we help you participate today?</h1>
          <p className="subtitle">Ask any questions regarding the Election Commission of India, voter registration, or election schedules.</p>
        </div>

        {/* Chat Interface */}
        <div className="chat-interface">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="quick-actions">
                  {quickActions.map((qa, idx) => (
                    <button
                      key={idx}
                      className="btn-secondary"
                      onClick={() => handleSend(qa.label)}
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const msgId = `msg-${idx}`;
                return (
                  <motion.div
                    key={idx}
                    className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!isUser && (
                      <div className="avatar ai-avatar">
                        <img src="/logo.png" alt="ECI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                    <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
                      <p>{msg.content}</p>
                      {!isUser && (
                        <button
                          className="copy-btn"
                          onClick={() => copyText(msg.content, msgId)}
                        >
                          {copiedId === msgId ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                    {isUser && <div className="avatar user-avatar">You</div>}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {loading && (
              <motion.div
                className="message-row ai-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="avatar ai-avatar">
                  <img src="/logo.png" alt="ECI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="message-bubble ai-bubble typing">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="btn-send"
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="disclaimer">
              This assistant uses AI to provide information. Please verify critical dates at eci.gov.in.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

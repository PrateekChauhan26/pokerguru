import React, { useState, useEffect, useRef } from 'react';
import { ChatService } from './services/ChatService';
import cardsPokerNight from './assets/images/cards-prepared-poker-night.jpg';
import SplashScreen from './components/SplashScreen';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isPokerRelated?: boolean;
  confidence?: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [showSplash, setShowSplash] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!showSplash) {
      // Welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Welcome to PokerGuru! 🃏 I'm your AI poker assistant. Ask me anything about poker - strategies, rules, odds, hand rankings, or any other poker-related questions!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [showSplash]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await ChatService.sendMessage({
        message: inputMessage,
        sessionId,
      });

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        isPokerRelated: response.isPokerRelated,
        confidence: response.intentConfidence,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            background: `
              linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url(${cardsPokerNight}) center center / cover no-repeat,
              radial-gradient(ellipse at center, rgba(0, 40, 28, 0.9) 0%, rgba(0, 20, 15, 0.95) 100%)
            `,
            backdropFilter: 'blur(4px)',
            color: 'white'
          }}
        >
          {/* Header */}
          <header className="relative z-20 px-4 pb-2">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-b-xl p-3 shadow-2xl">
                <div className="flex items-center justify-center space-x-4">
                  {/* Left Cards */}
                  <div className="flex space-x-2">
                    <div className="w-10 h-12 bg-white rounded-lg border border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 animate-swing-left">
                      <span className="text-black text-sm font-bold">A</span>
                      <span className="text-black text-lg">♠</span>
                    </div>
                    <div className="w-10 h-12 bg-white rounded-lg border border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 animate-swing-left-delay">
                      <span className="text-red-600 text-sm font-bold">A</span>
                      <span className="text-red-600 text-lg">♦</span>
                    </div>
                  </div>
                  
                  {/* Center Logo */}
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-1 logo-glow">
                      PokerGuru
                    </h1>
                    <p className="text-gray-300 text-base">Your AI Poker Assistant</p>
                  </div>
                  
                  {/* Right Cards */}
                  <div className="flex space-x-2">
                    <div className="w-10 h-12 bg-white rounded-lg border border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 animate-swing-right">
                      <span className="text-red-600 text-sm font-bold">Q</span>
                      <span className="text-red-600 text-lg">♥</span>
                    </div>
                    <div className="w-10 h-12 bg-white rounded-lg border border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 animate-swing-right-delay">
                      <span className="text-black text-sm font-bold">J</span>
                      <span className="text-black text-lg">♣</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Chat Container */}
          <main className="max-w-6xl mx-auto px-4 pt-2 pb-4 h-[calc(100vh-90px)] flex flex-col relative z-10">
            
            {/* Messages Area */}
            <div className="flex-1 bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-2 overflow-hidden shadow-2xl">
              <div className="h-full overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-fade-in flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-2xl p-4 shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600/80 text-white border border-blue-500/30'
                        : 'bg-gray-800/80 text-gray-100 border border-gray-600/30'
                    }`}>
                      <div className="text-base leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start fade-in">
                    <div className="bg-gray-800/80 text-gray-100 border border-gray-600/30 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-400">PokerGuru is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about poker..."
                    className="w-full bg-gray-800/60 text-white placeholder-gray-400 border border-gray-600/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  Send
                </button>
              </div>
              
              {/* Quick Suggestions */}
              <div className="mt-3">
                <div className="max-h-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <div className="flex flex-wrap gap-1.5 pr-2">
                    {[
                      'What are the basic poker hand rankings?', 
                      'How to calculate pot odds?', 
                      'Best starting hands in poker', 
                      'When should I fold or bluff?',
                      'What is a flush draw?',
                      'How to play pocket aces?',
                      'What are betting patterns?',
                      'Explain tournament strategy in poker',
                      'What is position in poker?',
                      'How to read opponents in poker game?'
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setInputMessage(suggestion)}
                        className="px-2.5 py-1 text-xs bg-gray-700/60 hover:bg-gray-600/60 text-gray-200 rounded-md border border-gray-600/30 transition-all duration-200 flex-shrink-0"
                        disabled={isLoading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Made by Badge */}
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none select-none">
            <span className="inline-block bg-black/60 text-white px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
              Made by Prateek
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
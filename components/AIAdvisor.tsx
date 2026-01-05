
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';
import { getSmartRecommendations } from '../services/geminiService';
import { ChatMessage, Movie } from '../types';
import { MOVIES } from '../services/movieService';

interface AIAdvisorProps {
  onSelectMovie: (movie: Movie) => void;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ onSelectMovie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I am your MoviReco advisor. Tell me what mood you are in or what kind of movie you are looking for.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await getSmartRecommendations(userMsg);
      const recommendedMovies = MOVIES.filter(m => result.recommendedIds.includes(m.id));
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: result.explanation,
        movies: recommendedMovies
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble finding recommendations. Try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-red-600 to-rose-400 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:scale-110 transition-transform"
        >
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
          <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need a recommendation?
          </div>
        </button>
      ) : (
        <div className="flex flex-col w-80 md:w-96 h-[500px] bg-[#181818] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-600/20 to-transparent border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-600 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">MoviReco</h3>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-none flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-red-600'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="space-y-2">
                    <div className={`p-3 text-sm leading-relaxed rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#2a2a2a] text-gray-200 rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                    {msg.movies && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {msg.movies.map(movie => (
                          <div 
                            key={movie.id} 
                            onClick={() => onSelectMovie(movie)}
                            className="group cursor-pointer rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition-colors"
                          >
                            <img src={movie.thumbnail} alt={movie.title} className="w-full h-20 object-cover" />
                            <div className="p-1 bg-[#2a2a2a] text-[10px] font-bold truncate text-center group-hover:bg-red-600 transition-colors">
                              {movie.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-2 items-center text-gray-400 text-xs animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800 bg-[#121212]">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for something..."
                className="w-full bg-[#2a2a2a] border-none rounded-full py-3 px-5 pr-12 text-sm focus:ring-2 ring-red-600 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
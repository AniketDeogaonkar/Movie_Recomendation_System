
import React from 'react';
import { X, Sparkles, TrendingUp, Info, Play, BellOff } from 'lucide-react';
import { Movie } from '../types';
import { MOVIES } from '../services/movieService';

interface NotificationItem {
  id: string;
  type: 'recommendation' | 'trending' | 'alert';
  title: string;
  message: string;
  time: string;
  movieId?: string;
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'recommendation',
    title: 'Personalized Pick',
    message: 'MoviReco AI thinks you would love "Interstellar". Check it out!',
    time: '2 mins ago',
    movieId: '1'
  },
  {
    id: 'n2',
    type: 'trending',
    title: 'Rising Rapidly',
    message: 'Dune: Part Two is trending globally right now.',
    time: '1 hour ago',
    movieId: '6'
  },
  {
    id: 'n3',
    type: 'alert',
    title: 'Account Update',
    message: 'Your Premium subscription was successfully renewed.',
    time: '5 hours ago'
  },
  {
    id: 'n4',
    type: 'recommendation',
    title: 'Based on Inception',
    message: 'Since you liked Inception, you might enjoy Blade Runner 2049.',
    time: '1 day ago',
    movieId: '7'
  }
];

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose, onSelectMovie }) => {
  const handleItemClick = (item: NotificationItem) => {
    if (item.movieId) {
      const movie = MOVIES.find(m => m.id === item.movieId);
      if (movie) {
        onSelectMovie(movie);
        onClose();
      }
    }
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0f0f0f] border-l border-gray-800 z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-black/20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold tracking-tight">Notifications</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {NOTIFICATIONS.length > 0 ? (
              <div className="divide-y divide-gray-800/50">
                {NOTIFICATIONS.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-6 hover:bg-white/5 cursor-pointer transition-all duration-300 group ${
                      item.movieId ? 'relative' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        item.type === 'recommendation' ? 'bg-red-600/20 text-red-500' :
                        item.type === 'trending' ? 'bg-green-600/20 text-green-500' :
                        'bg-blue-600/20 text-blue-500'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-[10px] text-gray-600 font-medium">{item.time}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-100 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed group-hover:text-gray-300">
                      {item.message}
                    </p>
                    
                    {item.movieId && (
                      <div className="mt-4 flex items-center text-[10px] font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <Play className="w-3 h-3 mr-1 fill-current" /> VIEW MOVIE
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-40">
                <BellOff className="w-12 h-12 mb-4" />
                <p className="text-sm font-medium">No new notifications</p>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-black/40 border-t border-gray-800">
            <button className="w-full py-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;

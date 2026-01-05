
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Bell, User, X, Play, TrendingUp } from 'lucide-react';
import { MOVIES } from '../services/movieService';
import { Movie, UserProfile } from '../types';

interface NavbarProps {
  onSelectMovie: (movie: Movie) => void;
  onToggleNotifications: () => void;
  onProfileClick: () => void;
  notificationCount: number;
  user: UserProfile | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSelectMovie, 
  onToggleNotifications, 
  onProfileClick, 
  notificationCount,
  user
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (isSearchVisible) {
        setIsSearchVisible(false);
        setShowSuggestions(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchVisible]);

  // Highlighting helper function
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-red-500 font-extrabold">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    return MOVIES.filter(m => 
      m.title.toLowerCase().includes(query) ||
      m.genre.some(g => g.toLowerCase().includes(query)) ||
      m.cast.some(c => c.toLowerCase().includes(query))
    ).slice(0, 5); 
  }, [searchQuery]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleSelect = (movie: Movie) => {
    onSelectMovie(movie);
    setSearchQuery('');
    setShowSuggestions(false);
    setIsSearchVisible(false);
    setSelectedIndex(-1);
    searchInputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Tab') {
      if (suggestions.length > 0 && showSuggestions) {
        e.preventDefault();
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsSearchVisible(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setTimeout(() => searchInputRef.current?.focus(), 400);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-4 md:px-12 py-3 flex items-center justify-between ${
      isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg border-b border-gray-900' : 'bg-transparent'
    }`}>
      {/* Left Column: Logo & Main Nav */}
      <div className={`w-1/4 flex items-center transition-all duration-500 ${isSearchVisible && window.innerWidth < 1024 ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
        <h1 className="text-red-600 font-black text-xl md:text-2xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          MoviReco
        </h1>
        <div className="hidden xl:flex items-center ml-8 space-x-6 text-xs font-bold text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">TV Shows</a>
          <a href="#" className="hover:text-white transition-colors">Movies</a>
          <a href="#" className="hover:text-white transition-colors">My List</a>
        </div>
      </div>

      {/* Center Column: Search Bar Container */}
      <div ref={searchContainerRef} className="flex-1 flex justify-center items-center relative h-12">
        <div 
          className={`absolute flex items-center bg-black/90 border rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
            isSearchVisible 
              ? 'w-full max-w-xl opacity-100 scale-100 px-5 py-2.5 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
              : 'w-0 opacity-0 scale-75 overflow-hidden pointer-events-none border-transparent'
          }`}
        >
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search titles, actors, or genres..."
            className="bg-transparent w-full outline-none text-sm px-4 text-white placeholder:text-gray-500 font-medium"
          />
          <button onClick={() => { setIsSearchVisible(false); setSearchQuery(''); }}>
            <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors shrink-0" />
          </button>
        </div>

        {/* Suggestion Dropdown Panel */}
        {showSuggestions && suggestions.length > 0 && isSearchVisible && (
          <div className="absolute top-[110%] left-0 right-0 mx-auto max-w-xl bg-[#141414] border border-gray-800 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="px-5 py-3 border-b border-gray-800/50 bg-black/40 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center">
                <TrendingUp className="w-3 h-3 mr-2" /> Match Results
              </span>
              <span className="text-[9px] text-gray-600">LIMIT: 5 RESULTS</span>
            </div>
            <div className="py-2">
              {suggestions.map((movie, index) => {
                const matchedCast = movie.cast.find(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
                return (
                  <div
                    key={movie.id}
                    onClick={() => handleSelect(movie)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center px-5 py-3.5 cursor-pointer transition-all duration-200 ${
                      selectedIndex === index ? 'bg-white/10 pl-7' : 'hover:bg-white/5'
                    }`}
                  >
                    <img src={movie.thumbnail} alt={movie.title} className="w-12 h-16 object-cover rounded-lg" />
                    <div className="ml-5 flex-1 overflow-hidden">
                      <div className="text-sm font-bold text-gray-100">{highlightText(movie.title, searchQuery)}</div>
                      <div className="text-[10px] text-gray-500 truncate mt-1">
                        {matchedCast ? `Starring: ${matchedCast}` : movie.genre.join(', ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Actions */}
      <div className={`w-1/4 flex items-center justify-end space-x-5 transition-all duration-500 ${isSearchVisible && window.innerWidth < 1024 ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
        <button onClick={toggleSearch} className="p-2.5 text-gray-300 hover:text-white rounded-full transition-all">
          <Search className="w-5 h-5" />
        </button>
        
        <button onClick={onToggleNotifications} className="relative p-2 hover:bg-white/10 rounded-full transition-all">
          <Bell className="w-5 h-5 text-gray-400" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#0a0a0a]"></span>
          )}
        </button>
        
        <div 
          onClick={onProfileClick}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-indigo-700 flex items-center justify-center overflow-hidden border border-gray-800 group-hover:border-white/50 transition-all shadow-xl">
            {user ? (
               <div className="text-[10px] font-black text-white">{user.name.charAt(0)}</div>
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="hidden lg:inline text-xs font-black text-gray-300 group-hover:text-white tracking-wider">
            {user ? user.name.split(' ')[0].toUpperCase() : 'SIGN IN'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

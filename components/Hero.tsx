
import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onMoreInfo }) => {
  return (
    <div className="relative h-[85vh] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={movie.backdrop} 
          alt={movie.title}
          className="w-full h-full object-cover transform scale-105 animate-[pulse_10s_infinite]"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 px-4 md:px-12 max-w-2xl mt-20">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-600 text-[10px] font-bold px-1 py-0.5 rounded">ORIGINAL</span>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Premium Collection</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
          {movie.title}
        </h1>
        <p className="text-lg text-gray-200 mb-8 line-clamp-3 drop-shadow-md leading-relaxed">
          {movie.description}
        </p>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-8 py-3 bg-white text-black rounded font-bold hover:bg-gray-200 transition-all scale-100 hover:scale-105 active:scale-95 shadow-xl">
            <Play className="w-5 h-5 mr-2 fill-current" />
            Play Now
          </button>
          <button 
            onClick={() => onMoreInfo(movie)}
            className="flex items-center px-8 py-3 bg-gray-500/30 text-white rounded font-bold hover:bg-gray-500/50 backdrop-blur-md transition-all shadow-xl"
          >
            <Info className="w-5 h-5 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

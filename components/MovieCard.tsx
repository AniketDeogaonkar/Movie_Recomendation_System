
import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onOpen: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-none w-40 md:w-64 h-24 md:h-36 transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(movie)}
    >
      <img 
        src={movie.thumbnail} 
        alt={movie.title}
        className="w-full h-full object-cover rounded shadow-md group-hover:opacity-0 transition-opacity"
      />
      
      {/* Expanded Hover State */}
      <div className={`absolute top-0 left-0 w-full h-full z-20 scale-125 opacity-0 transition-all duration-300 ${isHovered ? 'scale-150 -translate-y-8 opacity-100' : 'pointer-events-none'}`}>
        <div className="bg-[#181818] rounded shadow-2xl overflow-hidden movie-card-glow">
          <img 
            src={movie.thumbnail} 
            alt={movie.title}
            className="w-full h-32 object-cover"
          />
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-white rounded-full text-black">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                <div className="p-1 border border-gray-600 rounded-full hover:border-white">
                  <Plus className="w-3 h-3" />
                </div>
                <div className="p-1 border border-gray-600 rounded-full hover:border-white">
                  <ThumbsUp className="w-3 h-3" />
                </div>
              </div>
              <div className="p-1 border border-gray-600 rounded-full hover:border-white">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-[10px]">
              <span className="text-green-500 font-bold">98% Match</span>
              <span className="border border-gray-600 px-1 text-gray-400">{movie.year}</span>
              <span className="text-gray-400">{movie.duration}</span>
              <span className="border border-gray-600 px-1 text-[8px] text-gray-400">4K</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {movie.genre.map((g, i) => (
                <span key={i} className="text-[9px] text-white">
                  {g}{i < movie.genre.length - 1 && <span className="text-gray-600 ml-1">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;


import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onOpen: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onOpen }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 mb-12 relative group/row">
      <h2 className="text-xl font-semibold text-gray-200 px-4 md:px-12 hover:text-white cursor-pointer transition-colors inline-flex items-center">
        {title} <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover/row:opacity-100 transition-opacity" />
      </h2>
      
      <div className="relative overflow-hidden">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-30 bg-black/40 px-2 opacity-0 group-hover/row:opacity-100 hover:bg-black/60 transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div 
          ref={scrollRef}
          className="flex space-x-3 px-4 md:px-12 overflow-x-auto scrollbar-hide scroll-smooth py-10 -my-10"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onOpen={onOpen} />
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 bg-black/40 px-2 opacity-0 group-hover/row:opacity-100 hover:bg-black/60 transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;


import React from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, Info } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailsProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 pt-12 animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl bg-[#181818] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-[#181818] rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-96 w-full">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-12 space-y-4">
            <h2 className="text-4xl font-black">{movie.title}</h2>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-8 py-2 bg-white text-black rounded font-bold hover:bg-gray-200 transition-all">
                <Play className="w-5 h-5 mr-2 fill-current" /> Play
              </button>
              <div className="p-2 border border-gray-500 rounded-full hover:border-white cursor-pointer"><Plus className="w-5 h-5" /></div>
              <div className="p-2 border border-gray-500 rounded-full hover:border-white cursor-pointer"><ThumbsUp className="w-5 h-5" /></div>
              <div className="p-2 border border-gray-500 rounded-full hover:border-white cursor-pointer"><Volume2 className="w-5 h-5" /></div>
            </div>
          </div>
        </div>

        <div className="px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 text-sm font-medium">
              <span className="text-green-500 font-bold">98% Match</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="text-gray-400">{movie.duration}</span>
              <span className="border border-gray-600 px-1 text-[10px] text-gray-400">U/A 16+</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-200">
              {movie.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="text-gray-500">Cast:</span>
              <span className="text-gray-300 ml-2">{movie.cast.join(', ')}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Genres:</span>
              <span className="text-gray-300 ml-2">{movie.genre.join(', ')}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">This movie is:</span>
              <span className="text-gray-300 ml-2">Mind-bending, Atmospheric, Visually Stunning</span>
            </div>
          </div>
        </div>

        {/* Similar Content Placeholder */}
        <div className="px-12 pb-12">
          <h3 className="text-xl font-bold mb-6">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#2f2f2f] rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-white transition-all">
                <img src={`https://picsum.photos/seed/similar_${i}/400/250`} className="w-full h-40 object-cover" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">Recommended {i}</div>
                    <div className="text-xs text-gray-400">92% Match • {2020+i}</div>
                  </div>
                  <div className="p-1 border border-gray-500 rounded-full"><Plus className="w-4 h-4" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

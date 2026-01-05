
import React from 'react';
import { User, LogOut, Heart, Star, Compass, ArrowLeft, ExternalLink } from 'lucide-react';
import { UserProfile, Movie } from '../types';
import { MOVIES } from '../services/movieService';

interface ProfilePageProps {
  user: UserProfile;
  onLogout: () => void;
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onBack, onSelectMovie }) => {
  const likedMovies = MOVIES.filter(m => user.likedMovieIds.includes(m.id));
  const ratedMovies = user.ratings.map(r => ({
    ...MOVIES.find(m => m.id === r.movieId)!,
    userScore: r.score
  }));

  return (
    <div className="fixed inset-0 z-[110] bg-[#0a0a0a] overflow-y-auto scrollbar-hide">
      {/* Dynamic Header */}
      <div className="relative h-64 bg-gradient-to-br from-red-900/40 via-indigo-900/40 to-black border-b border-gray-800">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        
        <button 
          onClick={onLogout}
          className="absolute top-8 right-8 flex items-center text-gray-400 hover:text-red-500 transition-colors font-bold text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>

        <div className="absolute -bottom-16 left-12 flex items-end space-x-6">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-red-600 to-indigo-700 p-1 shadow-2xl">
            <div className="w-full h-full bg-[#181818] rounded-[22px] flex items-center justify-center overflow-hidden">
               <User className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="pb-4">
            <h1 className="text-4xl font-black text-white">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-24 px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        {/* Left Col: Sidebar Info */}
        <div className="space-y-8">
          <section className="bg-white/5 border border-gray-800 rounded-3xl p-6">
            <h2 className="text-lg font-bold flex items-center mb-4">
              <Compass className="w-5 h-5 mr-2 text-red-500" /> My Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map(interest => (
                <span key={interest} className="px-3 py-1 bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-bold rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white/5 border border-gray-800 rounded-3xl p-6 text-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 rounded-2xl">
                <div className="text-2xl font-black text-white">{user.likedMovieIds.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Liked</div>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl">
                <div className="text-2xl font-black text-white">{user.ratings.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Rated</div>
              </div>
            </div>
          </section>
        </div>

        {/* Main Content: Activity */}
        <div className="lg:col-span-2 space-y-12">
          {/* Liked Movies */}
          <section>
            <h2 className="text-2xl font-black flex items-center mb-6">
              <Heart className="w-6 h-6 mr-3 text-red-600 fill-current" /> Liked Movies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {likedMovies.map(movie => (
                <div 
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-all"
                >
                  <img src={movie.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <div className="text-xs font-bold text-white truncate">{movie.title}</div>
                    <div className="text-[10px] text-gray-400 flex items-center mt-1">
                      <ExternalLink className="w-3 h-3 mr-1" /> View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ratings */}
          <section>
            <h2 className="text-2xl font-black flex items-center mb-6">
              <Star className="w-6 h-6 mr-3 text-yellow-500 fill-current" /> My Ratings
            </h2>
            <div className="space-y-4">
              {ratedMovies.map(movie => (
                <div 
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-gray-800 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img src={movie.thumbnail} className="w-12 h-16 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">{movie.title}</h3>
                      <p className="text-xs text-gray-500">{movie.genre.join(' • ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-xl">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-black text-yellow-500">{movie.userScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

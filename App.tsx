
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetails from './components/MovieDetails';
import AIAdvisor from './components/AIAdvisor';
import NotificationSidebar from './components/NotificationSidebar';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import { Movie, UserProfile } from './types';
import { MOVIES, getTrendingMovies, getNewMovies, getMoviesByGenre } from './services/movieService';

type ViewState = 'home' | 'auth' | 'profile';

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const heroMovie = useMemo(() => MOVIES[0], []);
  const trendingMovies = useMemo(() => getTrendingMovies(), []);
  const newMovies = useMemo(() => getNewMovies(), []);
  const sciFiMovies = useMemo(() => getMoviesByGenre('Sci-Fi'), []);
  const comedyMovies = useMemo(() => getMoviesByGenre('Comedy'), []);

  const handleOpenMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleProfileClick = () => {
    if (user) {
      setCurrentView('profile');
    } else {
      setCurrentView('auth');
    }
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      <Navbar 
        onSelectMovie={handleOpenMovie} 
        onToggleNotifications={() => setIsNotificationOpen(true)}
        onProfileClick={handleProfileClick}
        notificationCount={user ? 3 : 0}
        user={user}
      />
      
      <main>
        <Hero 
          movie={heroMovie} 
          onMoreInfo={handleOpenMovie} 
        />
        
        <div className="relative -mt-32 z-20 space-y-12 pb-12">
          <MovieRow 
            title="Trending Now" 
            movies={trendingMovies} 
            onOpen={handleOpenMovie} 
          />
          
          <MovieRow 
            title="Recently Added" 
            movies={newMovies} 
            onOpen={handleOpenMovie} 
          />

          <MovieRow 
            title="Sci-Fi Blockbusters" 
            movies={sciFiMovies} 
            onOpen={handleOpenMovie} 
          />

          <MovieRow 
            title="Laugh-Out-Loud Comedies" 
            movies={comedyMovies} 
            onOpen={handleOpenMovie} 
          />
        </div>
      </main>

      {/* Overlays & Routing */}
      <MovieDetails 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
      
      <NotificationSidebar 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)}
        onSelectMovie={handleOpenMovie}
      />

      {currentView === 'auth' && (
        <AuthPage 
          onLogin={handleLogin} 
          onBack={() => setCurrentView('home')} 
        />
      )}

      {currentView === 'profile' && user && (
        <ProfilePage 
          user={user} 
          onLogout={handleLogout} 
          onBack={() => setCurrentView('home')} 
          onSelectMovie={handleOpenMovie}
        />
      )}
      
      <AIAdvisor onSelectMovie={handleOpenMovie} />

      {/* Footer Branding */}
      <footer className="mt-20 px-12 py-12 border-t border-gray-900 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-12 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Center</a>
          <a href="#" className="hover:underline">Investor Relations</a>
        </div>
        <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          © 2024 MoviReco - Powered by Gemini
        </div>
      </footer>
    </div>
  );
};

export default App;

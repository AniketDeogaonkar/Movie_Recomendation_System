
import React, { useState } from 'react';
import { Mail, Lock, User, ChevronRight, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  onLogin: (user: UserProfile) => void;
  onBack: () => void;
}

type AuthMode = 'selection' | 'signin' | 'signup';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('selection');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate cinematic authentication delay with unique loader
    setTimeout(() => {
      const mockUser: UserProfile = {
        name: formData.name || (mode === 'signup' ? 'New Explorer' : 'Alex Chen'),
        email: formData.email || 'user@movireco.ai',
        interests: ['Sci-Fi', 'Thriller', 'Action'],
        likedMovieIds: ['1', '3', '6'],
        ratings: [
          { movieId: '2', score: 9.5 },
          { movieId: '5', score: 8.0 }
        ]
      };
      setIsLoading(false);
      onLogin(mockUser);
    }, 2500);
  };

  const CinematicLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        {/* Glowing central pulse */}
        <div className="absolute inset-0 m-auto w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75 shadow-[0_0_20px_#dc2626]"></div>
        <div className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#ffffff]"></div>
        
        {/* Interlocking Orbital Rings */}
        <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-[spin_0.8s_linear_infinite]"></div>
        <div className="absolute inset-2 border-2 border-transparent border-r-indigo-500 rounded-full animate-[spin_1.2s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute inset-4 border border-transparent border-l-white/40 rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase mb-1">
          Processing
        </span>
        <span className="text-[11px] font-black tracking-[0.2em] text-red-500 uppercase animate-pulse">
          Secure Cinematic Link
        </span>
      </div>
    </div>
  );

  const renderSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl animate-in fade-in zoom-in-95 duration-700">
      {/* Get Started Card */}
      <div 
        onClick={() => setMode('signup')}
        className="group relative bg-gradient-to-br from-red-600/10 via-red-900/20 to-black border border-red-500/20 p-10 rounded-[2.5rem] cursor-pointer hover:border-red-500 hover:scale-[1.03] transition-all duration-500 flex flex-col items-center text-center space-y-6 shadow-2xl hover:shadow-red-600/20"
      >
        <div className="w-24 h-24 rounded-3xl bg-red-600 flex items-center justify-center shadow-[0_10px_30px_rgba(220,38,38,0.5)] group-hover:rotate-12 transition-transform duration-500">
          <UserPlus className="w-12 h-12 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Get Started</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
            New to MoviReco? Create your profile and start your AI-powered journey.
          </p>
        </div>
        <div className="pt-4 w-full">
          <div className="bg-red-600 text-white font-black text-sm uppercase tracking-widest py-4 px-8 rounded-2xl flex items-center justify-center group-hover:bg-red-700 transition-all">
            Join Now <ChevronRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>

      {/* Welcome Back Card */}
      <div 
        onClick={() => setMode('signin')}
        className="group relative bg-white/[0.02] border border-gray-800 p-10 rounded-[2.5rem] cursor-pointer hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.03] transition-all duration-500 flex flex-col items-center text-center space-y-6"
      >
        <div className="w-24 h-24 rounded-3xl bg-gray-800 flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-transform duration-500">
          <LogIn className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
            Already a member? Sign in to access your curated lists and ratings.
          </p>
        </div>
        <div className="pt-4 w-full">
          <div className="bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest py-4 px-8 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-all">
            Sign In <ChevronRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="relative w-full max-w-md bg-black/60 backdrop-blur-3xl border border-gray-800 p-10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-12 duration-700">
      {!isLoading && (
        <button 
          onClick={() => setMode('selection')}
          className="absolute -top-16 left-0 flex items-center text-gray-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Choice
        </button>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-red-600 tracking-tighter mb-2 italic">MoviReco</h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-60">
          {mode === 'signup' ? 'Identity Creation' : 'Authorization Required'}
        </p>
      </div>

      {isLoading ? (
        <div className="py-16">
          <CinematicLoader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Display Name"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-red-600 focus:bg-white/[0.06] transition-all text-white font-medium text-sm"
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-red-600 focus:bg-white/[0.06] transition-all text-white font-medium text-sm"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="password"
              placeholder="Secure Password"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-red-600 focus:bg-white/[0.06] transition-all text-white font-medium text-sm"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center group transition-all mt-6 shadow-xl shadow-red-600/20"
          >
            {mode === 'signup' ? 'Create Account' : 'Enter Cinema'}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-sm text-gray-500 font-medium">
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <span 
                    onClick={() => setMode('signin')}
                    className="text-red-500 font-black hover:text-red-400 cursor-pointer transition-colors"
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  New to MoviReco?{' '}
                  <span 
                    onClick={() => setMode('signup')}
                    className="text-red-500 font-black hover:text-red-400 cursor-pointer transition-colors"
                  >
                    Join for free
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background with blurred shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {!isLoading && (
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-white transition-all z-20 group font-black uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Exit to Gallery
        </button>
      )}

      {mode === 'selection' ? renderSelection() : renderForm()}
    </div>
  );
};

export default AuthPage;

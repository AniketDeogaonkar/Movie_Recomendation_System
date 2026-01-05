
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  rating: number;
  year: number;
  genre: string[];
  duration: string;
  cast: string[];
  isTrending?: boolean;
  isNew?: boolean;
}

export interface UserRating {
  movieId: string;
  score: number;
}

export interface UserProfile {
  name: string;
  email: string;
  interests: string[];
  likedMovieIds: string[];
  ratings: UserRating[];
}

export interface RecommendationResponse {
  recommendedIds: string[];
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  movies?: Movie[];
}

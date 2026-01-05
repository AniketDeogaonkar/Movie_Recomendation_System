
import { Movie } from '../types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Interstellar',
    description: 'When Earth becomes uninhabitable, a team of ex-pilots and scientists is tasked with finding a new home for mankind through a newly discovered wormhole.',
    thumbnail: 'https://picsum.photos/seed/interstellar_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    rating: 8.7,
    year: 2014,
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    duration: '2h 49m',
    cast: ['Matthew McConaughey', 'Anne Hathaway'],
    isTrending: true
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    thumbnail: 'https://picsum.photos/seed/darkknight_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1920&q=80',
    rating: 9.0,
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    duration: '2h 32m',
    cast: ['Christian Bale', 'Heath Ledger'],
    isTrending: true
  },
  {
    id: '3',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnail: 'https://picsum.photos/seed/inception_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80',
    rating: 8.8,
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    duration: '2h 28m',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
    isTrending: true
  },
  {
    id: '4',
    title: 'The Grand Budapest Hotel',
    description: 'A writer encounters the owner of a decaying high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
    thumbnail: 'https://picsum.photos/seed/grandbudapest_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1542204112-163df67106b3?auto=format&fit=crop&w=1920&q=80',
    rating: 8.1,
    year: 2014,
    genre: ['Comedy', 'Drama', 'Adventure'],
    duration: '1h 39m',
    cast: ['Ralph Fiennes', 'Tony Revolori'],
    isTrending: false
  },
  {
    id: '5',
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    thumbnail: 'https://picsum.photos/seed/parasite_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1535016120720-40c646bebbdc?auto=format&fit=crop&w=1920&q=80',
    rating: 8.5,
    year: 2019,
    genre: ['Drama', 'Thriller', 'Comedy'],
    duration: '2h 12m',
    cast: ['Song Kang-ho', 'Lee Sun-kyun'],
    isNew: true
  },
  {
    id: '6',
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    thumbnail: 'https://picsum.photos/seed/dune2_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1446776858070-70c3d5ed68a8?auto=format&fit=crop&w=1920&q=80',
    rating: 8.9,
    year: 2024,
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: '2h 46m',
    cast: ['Timothée Chalamet', 'Zendaya'],
    isNew: true
  },
  {
    id: '7',
    title: 'Blade Runner 2049',
    description: 'A young Blade Runner\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
    thumbnail: 'https://picsum.photos/seed/bladerunner_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1484589065579-248adc018443?auto=format&fit=crop&w=1920&q=80',
    rating: 8.0,
    year: 2017,
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    duration: '2h 44m',
    cast: ['Ryan Gosling', 'Harrison Ford']
  },
  {
    id: '8',
    title: 'Everything Everywhere All at Once',
    description: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    thumbnail: 'https://picsum.photos/seed/eeao_thumb/400/600',
    backdrop: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1920&q=80',
    rating: 7.8,
    year: 2022,
    genre: ['Sci-Fi', 'Adventure', 'Action', 'Comedy'],
    duration: '2h 19m',
    cast: ['Michelle Yeoh', 'Ke Huy Quan']
  }
];

export const getTrendingMovies = () => MOVIES.filter(m => m.isTrending);
export const getNewMovies = () => MOVIES.filter(m => m.isNew);
export const getMoviesByGenre = (genre: string) => MOVIES.filter(m => m.genre.includes(genre));
export const getAllGenres = () => Array.from(new Set(MOVIES.flatMap(m => m.genre)));

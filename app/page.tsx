'use client';
import Pagenav from "@/components/Pagenav"
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, Clock } from 'lucide-react';

/* SECURE THIS */

/* from the library */
interface Movie {
  id: string;
  title: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
  synopsis: string;
}

export default function Page(){
  return <Suspense>
    <HomePage />
  </Suspense>
}

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get current page from URL or default to 1
  const currentPage = searchParams.get('page') 
    ? parseInt(searchParams.get('page') as string) 
    : 1;

  // Get min and max year from URL or use defaults
  const minYear = searchParams.get('minYear') || '1990';
  const maxYear = searchParams.get('maxYear') || new Date().getFullYear().toString();
  const query = searchParams.get('query') || '';

  // Fetch available genres
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('/api/genres');
        if (response.ok) {
          const data = await response.json();
          setAvailableGenres(data.genres || []);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    
    fetchGenres();
  }, []);

  // Update selected genres when URL changes
  useEffect(() => {
    const genresParam = searchParams.get('genres');
    if (genresParam) {
      setSelectedGenres(genresParam.split(','));
    } else {
      setSelectedGenres([]);
    }
  }, [searchParams]);

  // Fetch movies based on filters
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('minYear', minYear);
        params.set('maxYear', maxYear);
        
        if (query) params.set('query', query);
        if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
        
        // Call the API endpoint
        const response = await fetch(`/api/titles?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        
        // API returns an array directly, not nested in a 'movies' object
        setMovies(data.title || []);
        
        // Calculate total pages based on the fact that you display 6 per page
        setTotalPages(Math.ceil((data.title?.length || 0) / 6));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMovies();
  }, [currentPage, minYear, maxYear, query, selectedGenres]);
  
  // Function to navigate to a different page
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  // Function to toggle genre selection
  const toggleGenre = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    const params = new URLSearchParams(searchParams);
    
    if (newSelectedGenres.length > 0) {
      params.set('genres', newSelectedGenres.join(','));
    } else {
      params.delete('genres');
    }
    
    params.set('page', '1'); // Reset to first page when changing filters
    router.push(`?${params.toString()}`);
  };

  // Function to update year range
  const updateYearRange = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('minYear', min);
    params.set('maxYear', max);
    params.set('page', '1'); // Reset to first page when changing filters
    router.push(`?${params.toString()}`);
  };

  // Function to update search query
  const updateSearchQuery = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }
    params.set('page', '1'); // Reset to first page when changing filters
    router.push(`?${params.toString()}`);
  };
  
  // Function to toggle favorite status
  const toggleFavorite = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation(); // Stop event bubbling
    
    try {
      // Find the movie in the current list
      const movie = movies.find(m => m.id === movieId);
      if (!movie) return;
      
      const method = movie.favorited ? 'DELETE' : 'POST';
      
      const response = await fetch(`/api/favorites/${movieId}`, {
        method: method,
      });
      
      if (response.ok) {
        // Update the movie's favorited status locally
        setMovies(movies.map(m => 
          m.id === movieId ? { ...m, favorited: !m.favorited } : m
        ));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  // Function to toggle watch later status
  const toggleWatchLater = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation(); // Stop event bubbling
    
    try {
      // Find the movie in the current list
      const movie = movies.find(m => m.id === movieId);
      if (!movie) return;
      
      const method = movie.watchLater ? 'DELETE' : 'POST';
      
      const response = await fetch(`/api/watch-later/${movieId}`, {
        method: method,
      });
      
      if (response.ok) {
        // Update the movie's watchLater status locally
        setMovies(movies.map(m => 
          m.id === movieId ? { ...m, watchLater: !m.watchLater } : m
        ));
      }
    } catch (error) {
      console.error('Error toggling watch later:', error);
    }
  };
  
  if (loading && movies.length === 0) {
    return <div className="flex justify-center p-12">Loading movies...</div>;
  }
  
  // Split genres into two rows--overkill? maybe, maybe not--
  const splitGenres = () => {
    if (availableGenres.length === 0) return [[], []];
    
    const halfLength = Math.ceil(availableGenres.length / 2);
    return [
      availableGenres.slice(0, halfLength),
      availableGenres.slice(halfLength)
    ];
  };
  
  const [firstRowGenres, secondRowGenres] = splitGenres();
  
  return (
    /* container for ALL movies and ALL buttons */
    <div className="flex flex-col w-full transition-all">
      <div className="p-4 bg-[#00003c]">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Left side - Search and Year filters */}
          <div className="md:w-1/4 lg:w-1/4 xl:w-1/4">
            <h2 className="text-lg font-medium mb-4">Search</h2>
            <input
              type="text"
              placeholder="Search Movies..."
              value={query}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 border-1 border-teal-200 rounded-full bg-[#0005b0] hover:bg-[#00a8a5] text-white"
            />
            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-sm mb-2">Min Year</h3>
                <input
                  type="number"
                  value={minYear}
                  onChange={(e) => updateYearRange(e.target.value, maxYear)}
                  className="w-full p-2 border-1 border-teal-200 rounded-full bg-[#0005b0] hover:bg-[#00a8a5] text-white"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm mb-2">Max Year</h3>
                <input
                  type="number"
                  value={maxYear}
                  onChange={(e) => updateYearRange(minYear, e.target.value)}
                  className="w-full p-2 border-1 border-teal-200 rounded-full bg-[#0005b0] hover:bg-[#00a8a5] text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Genres in two rows -- bite me! you not working right piece of carpe diem*/}
          <div className="md:w-1/2 lg:w-1/3">
            <h2 className="text-lg font-medium mb-4">Genres</h2>
            
            <div className="grid grid-cols-5 gap-x-1 gap-y-5 md:gap-5 sm:gap-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-1 py-0.5 sm:px-2 sm:py-1 text-center truncate rounded-full text-xs sm:text-sm md:text-sm ${
                    selectedGenres.includes(genre)
                    ? 'border border-teal-500 bg-teal-500 text-white'
                    : 'border border-teal-200 bg-navy-700 text-gray-300'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Movies Grid - more responsive to container width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1 mb-12 w-full">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group transition-all duration-300 hover:z-10 hover:scale-110 hover:shadow-xl">
            {/* Link to nowhere commented out to prevent navigation errors */}
            {/* <Link href={`/movies/${movie.id}`}> */}
              <div className="flex border-2 border-teal-200 relative rounded-lg overflow-hidden shadow-lg h-80">
                {movie.image ? (
                  <img 
                    src={movie.image} 
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No poster available</span>
                  </div>
                )}
                
                {/* Movie info overlay - only visible on hover */}
                
                <div className="absolute bottom-0 left-0 right-0 h-4/10 bg-[#00003c]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <div className="p-4">
                    <h1 className="text-2xl sm:text-1xl md:text-1x2 font-bold text-white">{movie.title} ({movie.released})</h1>
                    <p className="text-sm text-teal-200 mt-2">{movie.synopsis}</p>
                    <p className="text-sm text-gray-300 mt-2">{movie.genre}</p>
                    
                    {/* Action buttons in top right corner of the overlay */}
              

                    <div className="absolute top-6 right-2 z-10 cursor-pointer p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="p-1 rounded-full cursor-pointer"
                        onClick={(e) => toggleFavorite(e, movie.id)}
                      >
                        <Star 
                          size={24} 
                          fill={movie.favorited ? "#FFD700" : "transparent"} 
                          color="white" 
                        />
                      </button>
                      <button 
                        className="p-1 bg-[#00003c]/10 rounded-full cursor-pointer"
                        onClick={(e) => toggleWatchLater(e, movie.id)}
                      >
                        <Clock 
                          size={24} 
                          fill={movie.watchLater ? "#FFD700" : "transparent"} 
                          color="white" 
                        />
                      </button>
                    </div>
                  </div>
                  </div>
              
              </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}

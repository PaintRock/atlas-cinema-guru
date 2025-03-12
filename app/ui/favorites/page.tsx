'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Pagenav from "@/components/Pagenav";
import { useSearchParams, useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

//movie interface matches the one from HomePage
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
    <FavoritesPage />
  </Suspense>
}

 function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get current page from URL or default to 1
  const currentPage = searchParams.get('page') 
    ? parseInt(searchParams.get('page') as string) 
    : 1;

  // Fetch favorites based on current page
  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      try {
        // Call the API endpoint with pagination
        const response = await fetch(`/api/favorites?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        
        const data = await response.json();
        // Mark all movies from favorites as favorited=true
        const favoritedMovies = (data.favorites || []).map((movie: Movie) => ({
          ...movie,
          favorited: true
        }));
        setMovies(favoritedMovies);
        
        // Calculate total pages based on the fact that you display 6 per page
        // If the API doesn't provide total pages, this will need to be adjusted
        setTotalPages(Math.ceil((data.favorites?.length || 0) / 6) || 1);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFavorites();
  }, [currentPage]);
  
  // Function to toggle favorite status
  const toggleFavorite = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation(); // Stop event bubbling
    
    try {
      // Since this is the favorites page, we're only removing from favorites
      const response = await fetch(`/api/favorites/${movieId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove movie from the list
        setMovies(movies.filter(movie => movie.id !== movieId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  // Function to navigate to a different page
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/favorites?${params.toString()}`);
  };
  
  if (loading && movies.length === 0) {
    return <div className="flex justify-center p-12">Loading favorites...</div>;
  }
  
  // If no favorites found
  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-3xl font-bold text-white mb-4">Favorites</h1>
        <p className="text-xl text-gray-300 mb-8">You haven't added any movies to your favorites yet.</p>
        <Link href="/" className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full">
          Browse Movies
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full transition-all">
      <div className="flex justify-center my-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">Favorites</h1>
      </div>
      
      {/* Movie grid with responsive container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1 mb-12 w-full">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group transition-all duration-300 hover:z-10 hover:scale-110 hover:shadow-xl">
            <Link href={`/movies/${movie.id}`}>
              <div className="flex border-2 border-teal-200 relative rounded-lg overflow-hidden shadow-lg h-80">
                {/* Favorite Star - Always visible */}
                <div 
                  className="absolute top-2 right-2 z-10 cursor-pointer p-1 rounded-full bg-[#00003c]/60"
                  onClick={(e) => toggleFavorite(e, movie.id)}
                >
                  <Star 
                    size={24} 
                    fill="#FFD700" 
                    color="#FFD700"
                  />
                </div>
                
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
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{movie.title} ({movie.released})</h1>
                      <Star 
                        size={24} 
                        fill="#FFD700" 
                        color="#FFD700" 
                        className="cursor-pointer"
                        onClick={(e) => toggleFavorite(e, movie.id)}
                      />
                    </div>
                    <p className="text-sm text-teal-200 mt-2">{movie.synopsis}</p>
                    <p className="text-sm text-gray-300 mt-2">{movie.genre}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center mb-8">
        <Suspense>
        <Pagenav 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={goToPage} 
        />
        </Suspense>
      </div>
    </div>
  );
}

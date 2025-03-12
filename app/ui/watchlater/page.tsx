// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Pagenav from "@/components/Pagenav"
// import { useSearchParams, useRouter } from 'next/navigation';
// import { Star } from 'lucide-react';
// import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

//movie interface matches Homepage
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

export default function WatchLater() {
    // const [movies, setMovies] = useState<Movie[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [totalPages, setTotalPages] = useState(1);
    // const searchParams = useSearchParams();
    // const router = useRouter();

    // // Fet current page from Url or default to 1, because
    // const currentPage = searchParams.get('page')
    //     ? parseInt(searchParams.get('page') as string)
    //     : 1;
    // // Fetch watchlater based on current page
    // useEffect(() => {
    //     async function fetchWatchLater() {
    //         setLoadeing(true);
    //         try {
    //             //call the API enpoint with paginnation
    //             const response = await fetch ('/api/watchlater?page=${currentPage}');

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch favorites');
    //             }

    //             const data = await response.json();
    //             //Mark all watch-later movies as true
    //             const watchLaterMovies = (data.fa)
    //         }
    //     }
    // })
    return (
        <div className="flex bg-magenta text-xl justify-center">
            Coming Soon
        </div>
    )
}
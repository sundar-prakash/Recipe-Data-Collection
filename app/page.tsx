'use client';

import { useState, useEffect } from 'react';
import RecipeTable from '@/components/RecipeTable';
import Filters from '@/components/Filters';
import { Recipe } from '@/lib/types';
import { ChefHat, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search Filters
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');
  const [searchRating, setSearchRating] = useState<number | null>(null);
  const [searchServes, setSearchServes] = useState('');
  const [searchTime, setSearchTime] = useState('');

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      if (searchTitle) params.append('title', searchTitle);
      if (searchCuisine) params.append('cuisine', searchCuisine);
      if (searchRating) params.append('rating', `<=${searchRating}`);
      if (searchServes) params.append('serves', searchServes);
      if (searchTime) params.append('total_time', `<=${searchTime}`);

      const endpoint = (searchTitle || searchCuisine || searchRating || searchServes || searchTime) ? '/api/recipes/search' : '/api/recipes';

      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      if (data.data) {
        setRecipes(data.data);
        if (data.total !== undefined) setTotal(data.total);
        else if (endpoint.includes('search')) setTotal(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch recipes', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTitle, searchCuisine, searchRating, searchServes, searchTime]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [limit, searchTitle, searchCuisine, searchRating, searchServes, searchTime]);

  const totalPages = Math.ceil(total / limit);
  const startResult = total === 0 ? 0 : (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, total);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-100 flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ChefHat className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Recipe Delivery App</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-100 p-8 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <ChefHat className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Recipe Delivery App</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Filters
            setTitle={setSearchTitle}
            setCuisine={setSearchCuisine}
            setRating={setSearchRating}
            rating={searchRating}
            setServes={setSearchServes}
            setTime={setSearchTime}
          />
        </div>

        <div className="mt-auto pt-8 border-t border-gray-50 space-y-4">
          <div className="text-xs text-gray-400">
            &copy; 2025 Recepie Data App by <a className='text-black hover:opacity-70 transition-opacity' href="https://github.com/sundar-prakash">Sundar Prakash</a>
          </div>
          <div className="text-xs text-gray-400">
            Made with <a href="https://nextjs.org">Next.js</a> and <a href="https://supabase.com">Supabase</a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-2">Recipes</h2>
                <p className="text-gray-400">Discover and manage your culinary collection.</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Rows per page:</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="bg-gray-50 border-none rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-black/5 text-gray-900 font-medium cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-50 rounded-lg w-full"></div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm shadow-gray-100">
                <RecipeTable
                  recipes={recipes}
                  onRowClick={(recipe) => router.push(`/recipe/${recipe.id}`)}
                />
              </div>
            ) : (
              <div className="text-center py-32">
                <p className="text-gray-400 mb-4">No recipes found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTitle('');
                    setSearchCuisine('');
                    setSearchRating(null);
                    setSearchServes('');
                    setSearchTime('');
                  }}
                  className="text-sm font-medium text-black border-b border-black hover:opacity-70 pb-0.5 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {recipes.length > 0 && (
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-50 pt-8">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{startResult}</span> to <span className="font-medium text-gray-900">{endResult}</span> of <span className="font-medium text-gray-900">{total}</span> results
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex items-center px-4 text-sm font-medium text-gray-900">
                    Page {page} of {totalPages || 1}
                  </div>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

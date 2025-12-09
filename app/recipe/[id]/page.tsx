'use client';

import { useEffect, useState, use } from 'react';
import { Recipe } from '@/lib/types';
import { ArrowLeft, Clock, Flame, Info } from 'lucide-react';
import Link from 'next/link';

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`/api/recipes/${unwrappedParams.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [unwrappedParams.id]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <div className="space-y-4 animate-pulse max-w-2xl w-full">
                <div className="h-8 bg-gray-50 rounded w-1/3"></div>
                <div className="h-64 bg-gray-50 rounded-xl w-full"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gray-50 rounded-xl"></div>
                    <div className="h-24 bg-gray-50 rounded-xl"></div>
                    <div className="h-24 bg-gray-50 rounded-xl"></div>
                </div>
            </div>
        </div>
    );

    if (!recipe) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Recipe not found</h1>
            <p className="text-gray-500 mb-6">The recipe you are looking for does not exist.</p>
            <Link href="/" className="text-black underline underline-offset-4 hover:opacity-70">
                Return to Home
            </Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-white selection:bg-gray-100 pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
                    <Link href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Recipes
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">{recipe.title}</h1>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {recipe.cuisine}
                        </span>
                        {recipe.rating && (
                            <span className="text-sm text-gray-500">
                                ★ {recipe.rating.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-12 border-y border-gray-50 py-8">
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <Clock className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Total Time</span>
                        <span className="text-xl font-bold text-gray-900">{recipe.total_time || '-'}m</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <Flame className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Calories</span>
                        <span className="text-xl font-bold text-gray-900">
                            {recipe.nutrients?.calories ? parseInt(recipe.nutrients.calories).toString() : '-'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <Info className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Serves</span>
                        {/* FIX: Included the null check here as well */}
                        <span className="text-xl font-bold text-gray-900">{recipe.serves ? recipe.serves.replace(' servings', '') : '-'}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-[1.5fr,1fr] gap-12">
                    <div className="space-y-10">
                        {/* Location */}
                        {(recipe.continent || recipe.country_state) && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium">Location:</span>
                                {[recipe.country_state, recipe.continent].filter(Boolean).join(', ')}
                            </div>
                        )}

                        {/* Description */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About this recipe</h2>
                            <p className="text-gray-600 leading-8 text-lg font-light">
                                {recipe.description}
                            </p>
                        </section>

                        {/* Ingredients */}
                        {recipe.ingredients && recipe.ingredients.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Ingredients</h2>
                                <ul className="space-y-3">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                            <span>{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Instructions */}
                        {recipe.instructions && recipe.instructions.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Instructions</h2>
                                <div className="space-y-6">
                                    {recipe.instructions.map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-900 shrink-0 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <p className="text-gray-700 leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Timings */}
                        {(recipe.prep_time || recipe.cook_time) && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Preparation</h2>
                                <div className="flex gap-12 p-6 bg-gray-50 rounded-2xl">
                                    {recipe.prep_time && (
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Prep Time</span>
                                            <span className="text-xl font-medium text-gray-900">{recipe.prep_time} mins</span>
                                        </div>
                                    )}
                                    {recipe.cook_time && (
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Cook Time</span>
                                            <span className="text-xl font-medium text-gray-900">{recipe.cook_time} mins</span>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Instructions Link */}
                        {recipe.url_link && (
                            <section>
                                <a
                                    href={recipe.url_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-200"
                                >
                                    View Full Instructions
                                </a>
                            </section>
                        )}
                    </div>

                    <div className="space-y-10">
                        {/* Nutrition */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Nutrition Facts</h2>
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/50">
                                <div className="space-y-4">
                                    {recipe.nutrients && Object.entries(recipe.nutrients).map(([key, value]) => {
                                        if (key === 'calories') return null;
                                        return (
                                            <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 last:py-0">
                                                <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').replace('Content', '').trim()}</span>
                                                <span className="text-sm font-semibold text-gray-900">{String(value)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { Recipe } from '@/lib/types';
import { X, Clock, Flame, Info } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

interface RecipeDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    recipe: Recipe | null;
}

export default function RecipeDrawer({ isOpen, onClose, recipe }: RecipeDrawerProps) {
    const [activeTab, setActiveTab] = useState<'details' | 'nutrition'>('details');

    if (!recipe) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={clsx(
                "fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>

                {/* Header */}
                <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{recipe.title}</h2>
                        <p className="text-sm text-gray-500 mt-1 font-medium">{recipe.cuisine}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto">
                    {/* Hero / Key Stats */}
                    <div className="px-8 py-8 grid grid-cols-3 gap-4 border-b border-gray-100">
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                            <Clock className="w-5 h-5 text-gray-700 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Time</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">{recipe.total_time || '-'}m</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                            <Flame className="w-5 h-5 text-gray-700 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Calories</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">
                                {recipe.nutrients?.calories ? parseInt(recipe.nutrients.calories).toString() : '-'}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                            <Info className="w-5 h-5 text-gray-700 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Serves</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">{recipe.serves ? recipe.serves.replace(' servings', '') : '-'}</span>
                        </div>
                    </div>

                    <div className="px-8 py-8 space-y-8">
                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">About this recipe</h3>
                            <p className="text-gray-600 leading-relaxed font-light text-lg">
                                {recipe.description}
                            </p>
                        </div>

                        {/* Time Details */}
                        {(recipe.prep_time || recipe.cook_time) && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Preparation</h3>
                                <div className="flex space-x-8">
                                    {recipe.prep_time && (
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Prep Time</span>
                                            <span className="text-gray-900 font-medium">{recipe.prep_time} mins</span>
                                        </div>
                                    )}
                                    {recipe.cook_time && (
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Cook Time</span>
                                            <span className="text-gray-900 font-medium">{recipe.cook_time} mins</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Nutrition */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Nutrition Facts</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    {recipe.nutrients && Object.entries(recipe.nutrients).map(([key, value]) => {
                                        if (key === 'calories') return null; // Already shown
                                        return (
                                            <div key={key} className="flex justify-between items-baseline border-b border-gray-200/50 pb-2 last:border-0 last:pb-0">
                                                <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').replace('Content', '').trim()}</span>
                                                <span className="text-sm font-medium text-gray-900">{String(value)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    {recipe.url_link && (
                        <a
                            href={recipe.url_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-black text-white hover:bg-gray-800 h-12 rounded-lg font-medium transition-all"
                        >
                            View Full Recipe Instructions
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}

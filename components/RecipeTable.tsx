import { Recipe } from '@/lib/types';
import { Star, Clock, Users } from 'lucide-react';
import clsx from 'clsx';

interface RecipeTableProps {
    recipes: Recipe[];
    onRowClick: (recipe: Recipe) => void;
}

export default function RecipeTable({ recipes, onRowClick }: RecipeTableProps) {
    return (
        <div className="w-full bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Cuisine</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Serves</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {recipes.map((recipe) => (
                            <tr
                                key={recipe.id}
                                onClick={() => onRowClick(recipe)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                            >
                                <td className="px-6 py-5">
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-black">
                                        {recipe.title}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
                                        {recipe.cuisine}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center">
                                        <Star className={clsx("w-4 h-4 mr-1.5", recipe.rating && recipe.rating >= 4.5 ? "text-black fill-current" : "text-gray-300")} />
                                        <span className="text-sm text-gray-700">{recipe.rating ? recipe.rating.toFixed(1) : '-'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="w-4 h-4 mr-2 text-gray-300" />
                                        {recipe.total_time ? `${recipe.total_time} min` : '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="w-4 h-4 mr-2 text-gray-300" />
                                        {recipe.serves}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

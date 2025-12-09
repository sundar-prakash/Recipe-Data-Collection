import { Dispatch, SetStateAction, useState } from 'react';
import { Search, Star, Clock, Users } from 'lucide-react';
import clsx from 'clsx';

interface FiltersProps {
    setTitle: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
    setRating: Dispatch<SetStateAction<number | null>>;
    setServes: Dispatch<SetStateAction<string>>;
    setTime: Dispatch<SetStateAction<string>>;
    rating: number | null;
}

export default function Filters({ setTitle, setCuisine, setRating, setServes, setTime, rating }: FiltersProps) {
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    return (
        <div className="space-y-8">
            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Find a recipe..."
                        className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filters</label>

                {/* Cuisine */}
                <select
                    className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-black/5 focus:bg-white cursor-pointer transition-all appearance-none"
                    onChange={(e) => setCuisine(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                    <option value="">All Cuisines</option>
                    <option value="Southern Recipes">Southern Recipes</option>
                    <option value="Main Dishes">Main Dishes</option>
                    <option value="Desserts">Desserts</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                    {/* Serving Size */}
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            min="1"
                            placeholder="Serves..."
                            className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                            onChange={(e) => setServes(e.target.value)}
                        />
                    </div>

                    {/* Time */}
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            min="1"
                            placeholder="Max Time..."
                            className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(rating === star ? null : star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 -ml-1 hover:scale-110 transition-transform focus:outline-none"
                        >
                            <Star
                                className={clsx(
                                    "w-6 h-6 transition-colors",
                                    (hoverRating !== null ? star <= hoverRating : (rating !== null && star <= rating))
                                        ? "fill-black text-black"
                                        : "text-gray-300"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <div className="h-6 flex items-center justify-between mt-1">
                    {rating && (
                        <span className="text-xs text-gray-500 font-medium">
                            Upto {rating} Stars
                        </span>
                    )}
                    {(rating || hoverRating) && (
                        <button
                            onClick={() => setRating(null)}
                            className="text-xs text-gray-400 hover:text-black transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

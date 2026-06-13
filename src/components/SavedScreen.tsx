import React, { useState, useMemo } from 'react';
import { Search, Heart, Clock, Bookmark } from 'lucide-react';
import { Recipe } from '../types';
import { motion } from 'motion/react';

interface SavedScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function SavedScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite
}: SavedScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Only show recipes currently favorited
  const savedRecipes = useMemo(() => {
    let list = recipes.filter(r => r.isFavorite);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    return list;
  }, [recipes, searchQuery]);

  return (
    <div id="saved-screen-root" className="pb-24 pt-4 px-4 bg-warm-cream min-h-screen">
      {/* Title Header */}
      <div id="saved-header" className="mb-5 px-1">
        <h2 id="saved-main-title" className="text-2xl font-black text-stone-800 leading-tight">Kaydedilenler</h2>
        <p id="saved-desc" className="text-stone-500 font-medium text-xs mt-1">Özenle seçtiğin favori tariflerin burada.</p>
      </div>

      {/* Local Search Input Area */}
      <div id="saved-search-block" className="mb-6 relative">
        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-stone-400">
          <Search size={18} />
        </span>
        <input 
          id="saved-search-input"
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tariflerinde ara..." 
          className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
        />
      </div>

      {/* Grid Layout of Saved Recipes */}
      {savedRecipes.length === 0 ? (
        <div id="saved-empty-block" className="py-20 flex flex-col items-center justify-center text-center">
          <div id="saved-empty-icon-wrapper" className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-4 border border-stone-200/20">
            <Bookmark size={26} />
          </div>
          <p id="saved-empty-text" className="text-stone-400 text-sm font-semibold mb-1">Henüz hiçbir tarifi favoriye eklemediniz.</p>
          <p id="saved-empty-sub" className="text-stone-400/80 text-xs px-8">Beğendiğiniz yemek tariflerinin üzerindeki kalp simgesine basarak buraya ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div id="saved-grid-container" className="grid grid-cols-2 gap-4">
          {savedRecipes.map((recipe) => (
            <motion.div
              id={`saved-card-${recipe.id}`}
              key={recipe.id}
              whileHover={{ y: -3 }}
              layout
              className="bg-white rounded-[26px] overflow-hidden shadow-sm border border-stone-100 flex flex-col justify-between"
            >
              <div id={`saved-img-wrap-${recipe.id}`} className="relative h-28 cursor-pointer overflow-hidden group" onClick={() => onSelectRecipe(recipe)}>
                <img 
                  id={`saved-img-${recipe.id}`}
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <button
                  id={`saved-favorite-btn-${recipe.id}`}
                  onClick={(e) => onToggleFavorite(recipe.id, e)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow flex items-center justify-center text-stone-500 hover:scale-105 transition-all z-20"
                >
                  <Heart 
                    size={14} 
                    className="transition-colors fill-red-500 text-red-500" 
                  />
                </button>
                <div id={`saved-badge-time-${recipe.id}`} className="absolute bottom-2.5 left-2.5 bg-amber-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-1">
                  <Clock size={10} />
                  <span>{recipe.duration} dk</span>
                </div>
              </div>

              {/* Detail block */}
              <div id={`saved-detail-${recipe.id}`} className="p-3.5 flex flex-col justify-between flex-1">
                <h4 
                  id={`saved-title-clickable-${recipe.id}`}
                  onClick={() => onSelectRecipe(recipe)}
                  className="text-stone-800 text-xs font-extrabold leading-tight tracking-tight line-clamp-2 hover:text-primary-brown cursor-pointer min-h-8 mb-2"
                >
                  {recipe.title}
                </h4>
                
                {/* Visual Pill tags on Saved screen as shown on screen 6 */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div id={`saved-tags-row-${recipe.id}`} className="flex flex-wrap gap-1.5 mt-auto">
                    {recipe.tags.slice(0, 2).map((tag, tagIdx) => (
                      <span 
                        id={`saved-tag-pill-${recipe.id}-${tagIdx}`}
                        key={tagIdx} 
                        className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-extrabold text-stone-500 uppercase tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

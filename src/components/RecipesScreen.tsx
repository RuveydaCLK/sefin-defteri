import React, { useState, useMemo } from 'react';
import { Search, Heart, Clock, Filter, X } from 'lucide-react';
import { Recipe } from '../types';
import { INITIAL_CATEGORIES } from '../data';
import { motion } from 'motion/react';

interface RecipesScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  selectedCategoryId: string | null;
  onClearCategoryFilter: () => void;
}

type TabFilter = 'all' | 'new' | 'popular';

export default function RecipesScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  selectedCategoryId,
  onClearCategoryFilter
}: RecipesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  // Filter and search logic
  const filteredRecipes = useMemo(() => {
    let list = [...recipes];

    // 1. Category Filter
    if (selectedCategoryId) {
      list = list.filter(r => r.category === selectedCategoryId);
    }

    // 2. Tab filtering: 'all', 'new' (sorted by dateAdded), 'popular' (rating > 4.7)
    if (activeTab === 'new') {
      list.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (activeTab === 'popular') {
      list = list.filter(r => r.rating >= 4.7);
      list.sort((a, b) => b.rating - a.rating);
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query)) ||
        r.ingredients.some(i => i.toLowerCase().includes(query))
      );
    }

    return list;
  }, [recipes, selectedCategoryId, activeTab, searchQuery]);

  const activeCategoryName = useMemo(() => {
    if (!selectedCategoryId) return '';
    return INITIAL_CATEGORIES.find(c => c.id === selectedCategoryId)?.name || '';
  }, [selectedCategoryId]);

  return (
    <div id="recipes-screen-root" className="pb-24 pt-4 px-4 bg-warm-cream min-h-screen">
      
      {/* Header Search Input */}
      <div id="recipes-search-block" className="mb-4 relative">
        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-stone-400">
          <Search size={18} />
        </span>
        <input 
          id="recipes-search-input"
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tariflerde ara..." 
          className="w-full pl-12 pr-10 py-3.5 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
        />
        {searchQuery && (
          <button 
            id="clear-search-btn"
            onClick={() => setSearchQuery('')}
            className="absolute right-4.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Tag Indicator */}
      {selectedCategoryId && (
        <div id="category-filter-badge-row" className="flex items-center gap-2 mb-4 animate-fade-in">
          <div id="category-filter-badge" className="bg-primary-brown/10 text-primary-brown rounded-full px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 border border-primary-brown/25">
            <Filter size={12} className="inline" />
            <span>Kategori: {activeCategoryName}</span>
            <button id="clear-cat-filter" onClick={onClearCategoryFilter} className="hover:scale-110 ml-0.5 text-primary-brown-hover focus:outline-none">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tabs list matching mockup filter row */}
      <div id="recipes-tabs-bar" className="flex gap-2.5 mb-5">
        <button
          id="recipes-tab-all"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2.5 rounded-full text-[12px] font-extrabold shadow-sm transition-all tracking-wide ${
            activeTab === 'all' 
              ? 'bg-primary-brown text-white shadow-md' 
              : 'bg-stone-100 hover:bg-stone-200/60 text-stone-500'
          }`}
        >
          Tümü
        </button>
        <button
          id="recipes-tab-new"
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2.5 rounded-full text-[12px] font-extrabold shadow-sm transition-all tracking-wide ${
            activeTab === 'new' 
              ? 'bg-primary-brown text-white shadow-md' 
              : 'bg-stone-100 hover:bg-stone-200/60 text-stone-500'
          }`}
        >
          En Yeniler
        </button>
        <button
          id="recipes-tab-popular"
          onClick={() => setActiveTab('popular')}
          className={`flex-1 py-2.5 rounded-full text-[12px] font-extrabold shadow-sm transition-all tracking-wide ${
            activeTab === 'popular' 
              ? 'bg-primary-brown text-white shadow-md' 
              : 'bg-stone-100 hover:bg-stone-200/60 text-stone-500'
          }`}
        >
          En Popüler
        </button>
      </div>

      {/* Recipe Grid Layout */}
      {filteredRecipes.length === 0 ? (
        <div id="recipes-empty-block" className="py-20 text-center flex flex-col items-center justify-center">
          <p id="recipes-no-results" className="text-stone-400 text-sm font-semibold mb-2">Aradığınız kriterlere uygun tarif bulunamadı.</p>
          <button 
            id="recipes-reset-search"
            onClick={() => { setSearchQuery(''); onClearCategoryFilter(); setActiveTab('all'); }}
            className="text-primary-brown font-bold text-xs underline"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div id="recipes-grid-container" className="grid grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
            <motion.div
              id={`recipe-grid-card-${recipe.id}`}
              key={recipe.id}
              whileHover={{ y: -3 }}
              layout
              className="bg-white rounded-[26px] overflow-hidden shadow-sm border border-stone-100 flex flex-col justify-between h-full"
            >
              {/* Image with favorite absolute button */}
              <div id={`recipe-grid-img-wrap-${recipe.id}`} className="relative h-32 cursor-pointer overflow-hidden group" onClick={() => onSelectRecipe(recipe)}>
                <img 
                  id={`recipe-grid-img-${recipe.id}`}
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <button
                  id={`recipe-grid-favorite-${recipe.id}`}
                  onClick={(e) => onToggleFavorite(recipe.id, e)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow flex items-center justify-center text-stone-500 hover:scale-105 transition-all z-20"
                >
                  <Heart 
                    size={14} 
                    className={`transition-colors ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-500'}`} 
                  />
                </button>
              </div>

              {/* Detail block */}
              <div id={`recipe-grid-detail-${recipe.id}`} className="p-3.5 flex flex-col justify-between flex-1">
                <h4 
                  id={`recipe-grid-title-clickable-${recipe.id}`}
                  onClick={() => onSelectRecipe(recipe)}
                  className="text-stone-800 text-xs font-extrabold tracking-tight leading-tight line-clamp-2 hover:text-primary-brown cursor-pointer min-h-8 mb-2"
                >
                  {recipe.title}
                </h4>
                <div id={`recipe-grid-meta-${recipe.id}`} className="flex items-center gap-1.5 text-stone-400 text-[10px] font-bold">
                  <Clock size={11} />
                  <span>{recipe.duration} dk</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

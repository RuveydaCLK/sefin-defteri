import React, { useState } from 'react';
import { Search, Menu, Heart, Clock, Lightbulb } from 'lucide-react';
import { Recipe, Category } from '../types';
import { INITIAL_CATEGORIES } from '../data';
import LucideIcon from './LucideIcon';
import { motion } from 'motion/react';

interface HomeScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onNavigateToTab: (tab: 'home' | 'recipes' | 'add' | 'saved' | 'profile') => void;
  onCategoryFilter: (catId: string) => void;
  onOpenSidebar: () => void;
}

export default function HomeScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  onNavigateToTab,
  onCategoryFilter,
  onOpenSidebar
}: HomeScreenProps) {
  const [localSearch, setLocalSearch] = useState('');

  // Handle local typing, then send to 'recipes' tab with active search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onNavigateToTab('recipes');
      // Pass the search query globally via state
    }
  };

  // Find featured recipe for the top banner (Let's select 'lasagna' first)
  const featuredRecipe: Recipe = recipes.find(r => r.id === 'lasagna') || recipes.find(r => r.id === '2') || recipes[0];

  // Recently added recipes (Let's show the first 2 recipes from our list)
  const recentlyAdded = recipes.slice(0, 2);

  // Hardcode Şefin İpucu lists so it can cycle or stay exact to mockup
  const chefTip = "Makarnayı süzmeden önce bir bardak haşlama suyunu ayırın. Sosun kıvamını bağlamak için en iyi sır budur!";

  return (
    <div id="home-screen-root" className="pb-24 pt-4 px-4 bg-warm-cream min-h-screen">
      {/* Featured Recipe Banner */}
      <motion.div 
        id="home-featured-card"
        whileHover={{ scale: 0.99 }}
        onClick={() => onSelectRecipe(featuredRecipe)}
        className="relative w-full h-[220px] rounded-[32px] overflow-hidden shadow-md mb-6 cursor-pointer group"
      >
        <img 
          id="home-featured-image"
          src={featuredRecipe.image} 
          alt={featuredRecipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div id="home-featured-dim-overlay" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>
        
        {/* Day's Recipe Label Badge */}
        <div id="home-featured-badge" className="absolute top-4 left-4 bg-amber-700/90 text-amber-50 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm">
          Günün Tarifi
        </div>

        {/* Content Overlay */}
        <div id="home-featured-content" className="absolute bottom-5 left-5 right-5 text-white">
          <h2 id="home-featured-title" className="text-2xl font-black mb-1 font-serif tracking-tight drop-shadow-md">
            {featuredRecipe.title}
          </h2>
          <p id="home-featured-desc" className="text-stone-200 text-xs font-medium line-clamp-2 leading-relaxed opacity-95">
            {featuredRecipe.description}
          </p>
        </div>
      </motion.div>

      {/* Search Input Bar */}
      <form id="home-search-form" onSubmit={handleSearchSubmit} className="mb-6 relative">
        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-stone-400">
          <Search size={18} />
        </span>
        <input 
          id="home-search-input"
          type="text" 
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Tariflerde ara..." 
          className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
        />
      </form>

      {/* Categories Row */}
      <div id="home-categories-block" className="mb-6">
        <h3 id="home-categories-title" className="text-lg font-black text-stone-800 mb-3 px-1">Kategoriler</h3>
        <div id="home-categories-scroll" className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              id={`home-cat-item-${cat.id}`}
              key={cat.id}
              onClick={() => onCategoryFilter(cat.id)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              <div id={`home-cat-icon-container-${cat.id}`} className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.color} shadow-sm group-hover:scale-105 transition-all duration-300 border border-stone-200/10`}>
                <LucideIcon name={cat.iconName} className={`${cat.iconColor}`} size={22} />
              </div>
              <span id={`home-cat-name-${cat.id}`} className="text-[11px] font-bold text-stone-600 mt-2 tracking-tight group-hover:text-primary-brown">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Added Section */}
      <div id="home-recent-block" className="mb-6">
        <div id="home-recent-header" className="flex items-center justify-between mb-4 px-1">
          <h3 id="home-recent-title" className="text-lg font-black text-stone-800">Son Eklenenler</h3>
          <button 
            id="home-recent-all-btn"
            onClick={() => onNavigateToTab('recipes')} 
            className="text-primary-brown hover:text-primary-brown-hover font-bold text-xs tracking-tight uppercase"
          >
            Tümünü Gör
          </button>
        </div>

        {/* Dynamic Card Grids */}
        <div id="home-recent-grid" className="grid grid-cols-2 gap-4">
          {recentlyAdded.map((recipe) => (
            <motion.div 
              id={`recent-card-${recipe.id}`}
              key={recipe.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-100 flex flex-col justify-between"
            >
              <div id={`recent-image-wrapper-${recipe.id}`} className="relative h-28 cursor-pointer overflow-hidden group" onClick={() => onSelectRecipe(recipe)}>
                <img 
                  id={`recent-img-${recipe.id}`}
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <button
                  id={`recent-favorite-btn-${recipe.id}`}
                  onClick={(e) => onToggleFavorite(recipe.id, e)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow flex items-center justify-center text-stone-500 hover:scale-105 transition-all"
                >
                  <Heart 
                    size={15} 
                    className={`transition-colors ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-500'}`} 
                  />
                </button>
              </div>

              <div id={`recent-info-${recipe.id}`} className="p-3 flex flex-col justify-between flex-1">
                <h4 
                  id={`recent-title-clickable-${recipe.id}`}
                  onClick={() => onSelectRecipe(recipe)}
                  className="text-stone-800 text-xs font-extrabold leading-tight tracking-tight line-clamp-2 hover:text-primary-brown cursor-pointer min-h-8 mb-1.5"
                >
                  {recipe.title}
                </h4>
                <div id={`recent-meta-${recipe.id}`} className="flex items-center gap-1.5 text-stone-400 text-[10px] font-bold">
                  <Clock size={11} />
                  <span>{recipe.duration} dk</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chef's Tip Card */}
      <motion.div 
        id="home-chef-tip-card"
        initial={{ scale: 0.98, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-chef-green text-stone-50 p-5 rounded-[28px] shadow-md border border-emerald-800/10 mb-4"
      >
        <div id="chef-tip-label" className="flex items-center gap-2 mb-2">
          <div id="chef-tip-icon-bg" className="bg-white/15 p-1 rounded-full text-white">
            <Lightbulb size={16} />
          </div>
          <span id="chef-tip-label-text" className="text-xs font-extrabold tracking-widest uppercase">Şefin İpucu</span>
        </div>
        <p id="chef-tip-desc text" className="text-xs font-semibold leading-relaxed text-stone-100 italic opacity-95">
          "{chefTip}"
        </p>
      </motion.div>
    </div>
  );
}

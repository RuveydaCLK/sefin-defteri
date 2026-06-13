import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Clock, ChefHat, Users, Star, CheckSquare, Square, ThumbsUp } from 'lucide-react';
import { Recipe } from '../types';
import { motion } from 'motion/react';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function RecipeDetailScreen({
  recipe,
  onBack,
  onToggleFavorite
}: RecipeDetailScreenProps) {
  // Local checklists for interactive cooking companion
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [successToast, setSuccessToast] = useState('');

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setSuccessToast('Tarif linki panoya kopyalandı!');
      navigator.clipboard.writeText(`Enfes bir tarif buldum: ${recipe.title}!`);
      setTimeout(() => setSuccessToast(''), 2000);
    }
  };

  // Cooking progress calculation
  const totalSteps = recipe.instructions.length;
  const doneStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((doneStepsCount / totalSteps) * 100) || 0;

  return (
    <div id="recipe-detail-root" className="bg-warm-cream min-h-screen relative">
      {/* Toast */}
      {successToast && (
        <div id="detail-toast" className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-50 text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <span>{successToast}</span>
        </div>
      )}

      {/* Hero Image Overlay */}
      <div id="detail-hero" className="relative w-full h-[320px] bg-stone-200">
        <img 
          id="detail-hero-img"
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div id="detail-dim-overlay" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Absolute header row on top of food image */}
        <div id="detail-absolute-nav" className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between z-10">
          <button
            id="detail-back-btn"
            onClick={onBack}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-stone-700 hover:bg-white transition-all transform active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          
          <span id="detail-chef-banner-title" className="text-white font-extrabold text-sm font-serif px-3 py-1 bg-black/30 backdrop-blur-md rounded-full">
            Şefin Defteri
          </span>

          <div id="detail-nav-actions" className="flex items-center gap-2">
            <button
              id="detail-share-btn"
              onClick={shareRecipe}
              className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-stone-700 hover:bg-white transition-all transform active:scale-95"
            >
              <Share2 size={16} />
            </button>
            <button
              id="detail-fav-btn"
              onClick={(e) => onToggleFavorite(recipe.id, e)}
              className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-stone-700 hover:bg-white transition-all transform active:scale-95"
            >
              <Heart 
                size={16} 
                className={`transition-all ${recipe.isFavorite ? 'fill-red-500 text-red-500 scale-105' : 'text-stone-700'}`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Panel pulling up */}
      <div 
        id="detail-content-panel"
        className="relative -mt-10 bg-warm-cream rounded-t-[36px] px-5 pt-7 pb-24 shadow-2xl overflow-hidden border-t border-stone-200/20"
      >
        {/* Notch puller decor */}
        <div id="detail-notch-decor" className="w-12 h-1 bg-stone-300 rounded-full mx-auto -mt-3 mb-5 opacity-40"></div>

        {/* Main Title row */}
        <div id="detail-title-block" className="mb-4">
          <div id="detail-title-rating-row" className="flex items-start justify-between gap-4 mb-2">
            <h1 id="detail-recipe-title" className="text-2xl font-black text-stone-800 leading-tight tracking-tight">
              {recipe.title}
            </h1>
            <div id="detail-rating-badge" className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shrink-0 border border-amber-200/50">
              <Star size={13} className="fill-amber-500 text-amber-500 inline" />
              <span>{recipe.rating}</span>
            </div>
          </div>

          <div id="detail-author-row" className="flex items-center gap-2 text-stone-500 text-xs">
            <img 
              id="detail-author-avatar"
              src={recipe.authorAvatar} 
              alt={recipe.authorName} 
              className="w-5 h-5 rounded-full object-cover border border-stone-300"
              referrerPolicy="no-referrer"
            />
            <span id="detail-author-name" className="font-bold text-stone-600">{recipe.authorName}</span>
          </div>
        </div>

        {/* Info Badges Row */}
        <div id="detail-spec-badges-row" className="grid grid-cols-3 gap-3 mb-6">
          <div id="badge-duration" className="bg-stone-50 border border-stone-200/40 p-3.5 rounded-2xl flex flex-col items-center text-center shadow-xs">
            <Clock size={16} className="text-amber-600 mb-1" />
            <span id="spec-duration-label" className="text-[9px] font-extrabold text-stone-400 tracking-wider uppercase">SÜRE</span>
            <span id="spec-duration-val" className="text-xs font-black text-stone-700 mt-0.5">{recipe.duration} dk</span>
          </div>
          
          <div id="badge-difficulty" className="bg-stone-50 border border-stone-200/40 p-3.5 rounded-2xl flex flex-col items-center text-center shadow-xs">
            <ChefHat size={16} className="text-rose-500 mb-1" />
            <span id="spec-difficulty-label" className="text-[9px] font-extrabold text-stone-400 tracking-wider uppercase">ZORLUK</span>
            <span id="spec-difficulty-val" className="text-xs font-black text-stone-700 mt-0.5">{recipe.difficulty}</span>
          </div>

          <div id="badge-servings" className="bg-stone-50 border border-stone-200/40 p-3.5 rounded-2xl flex flex-col items-center text-center shadow-xs">
            <Users size={16} className="text-emerald-600 mb-1" />
            <span id="spec-servings-label" className="text-[9px] font-extrabold text-stone-400 tracking-wider uppercase">PORSİYON</span>
            <span id="spec-servings-val" className="text-xs font-black text-stone-700 mt-0.5">{recipe.servings} Kişi</span>
          </div>
        </div>

        {/* Ingredients Block (Malzemeler) */}
        <div id="detail-ingredients-card" className="bg-white border border-stone-200/50 p-5 rounded-[28px] shadow-sm mb-6 relative">
          {/* Highlight line accent */}
          <div id="ingredients-highlight-line" className="absolute top-0 left-8 right-8 h-[2px] bg-red-800"></div>

          <h3 id="ingredients-card-title" className="text-lg font-black text-stone-800 mb-4 tracking-tight flex items-center justify-between">
            <span>Malzemeler</span>
            <span id="ingredients-count" className="text-xs font-bold text-stone-400 font-sans">{recipe.ingredients.length} çeşit</span>
          </h3>

          <ul id="ingredients-list" className="space-y-2.5">
            {recipe.ingredients.map((ingredient, idx) => (
              <li 
                id={`ingredient-item-${idx}`}
                key={idx}
                onClick={() => toggleIngredient(idx)}
                className="flex items-start gap-2.5 cursor-pointer select-none group"
              >
                <span id={`ingredient-bullet-${idx}`} className="text-amber-600 text-sm mt-1/2">•</span>
                <span 
                  id={`ingredient-text-${idx}`}
                  className={`text-stone-600 text-xs font-semibold leading-relaxed transition-all decoration-stone-300 ${
                    checkedIngredients[idx] ? 'line-through text-stone-300 decoration-2' : 'group-hover:text-amber-800'
                  }`}
                >
                  {ingredient}
                </span>
              </li>
            ))}
          </ul>

          {/* Tag labels at checkout of ingredients */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div id="detail-tags-row" className="flex flex-wrap gap-2 mt-5 pt-4.5 border-t border-stone-100">
              {recipe.tags.map((tag, tagIdx) => (
                <span 
                  id={`detail-tag-badge-${tagIdx}`}
                  key={tagIdx} 
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-tight uppercase ${
                    tagIdx % 3 === 0 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : tagIdx % 3 === 1 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Preparation Block (Hazırlanışı) */}
        <div id="detail-instructions-card" className="bg-white border border-stone-200/50 p-5 rounded-[28px] shadow-sm mb-6 relative">
          {/* Highlight line accent */}
          <div id="instructions-highlight-line" className="absolute top-0 left-8 right-8 h-[2px] bg-red-800"></div>

          <h3 id="instructions-card-title" className="text-lg font-black text-stone-800 mb-4 tracking-tight">
            Hazırlanışı
          </h3>

          <div id="instructions-stepper-list" className="space-y-5 relative">
            {/* Draw connector track line */}
            <div id="stepper-connector-line" className="absolute left-4 top-2 bottom-5 w-[1.5px] bg-stone-100"></div>

            {recipe.instructions.map((step, idx) => {
              // Parse step description or show step as full
              const isDone = completedSteps[idx];
              const colonIndex = step.indexOf(':');
              let stepHeader = `Adım ${idx + 1}`;
              let stepDetail = step;

              if (colonIndex > 0) {
                stepHeader = step.slice(0, colonIndex);
                stepDetail = step.slice(colonIndex + 1).trim();
              }

              return (
                <div 
                  id={`step-container-${idx}`}
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className="flex gap-4 cursor-pointer select-none relative z-10 group"
                >
                  {/* Step bubble */}
                  <div 
                    id={`step-bubble-${idx}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all shrink-0 border ${
                      isDone 
                        ? 'bg-emerald-600 text-stone-50 border-emerald-600 shadow-xs' 
                        : 'bg-rose-100 text-rose-700 border-rose-200 group-hover:scale-105 group-hover:bg-rose-200/50'
                    }`}
                  >
                    {isDone ? <ThumbsUp size={11} strokeWidth={3.5} /> : idx + 1}
                  </div>

                  {/* Step Description */}
                  <div id={`step-content-${idx}`} className="flex-1 pt-0.5">
                    <h4 
                      id={`step-header-text-${idx}`}
                      className={`text-[12px] font-extrabold tracking-tight mb-0.5 transition-all ${
                        isDone ? 'text-stone-300 line-through' : 'text-stone-800'
                      }`}
                    >
                      {stepHeader}
                    </h4>
                    <p 
                      id={`step-detail-text-${idx}`}
                      className={`text-xs text-stone-500 leading-relaxed font-medium transition-all ${
                        isDone ? 'text-stone-300 line-through' : 'text-stone-500'
                      }`}
                    >
                      {stepDetail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Cooking Progress Bar ("Pişirme Aşaması") */}
          <div id="detail-progress-block" className="mt-8 pt-5 border-t border-stone-100">
            <div id="detail-progress-labels" className="flex items-center justify-between text-[11px] font-extrabold text-stone-600 mb-2 uppercase tracking-wider">
              <span>Pişirme Aşaması</span>
              <span id="detail-progress-percent" className="font-mono text-primary-brown">{progressPercent}%</span>
            </div>
            
            {/* Outer track */}
            <div id="detail-progress-track" className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              {/* Inner fill */}
              <motion.div 
                id="detail-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary-brown rounded-full"
              ></motion.div>
            </div>
            <p id="detail-progress-coach" className="text-[10px] text-stone-400 font-bold mt-1.5 text-center">
              {progressPercent === 100 
                ? 'Harika! Tarif tamamlandı, afiyet olsun! 🎉' 
                : 'Pişirdikçe adımların üzerine tıklayarak ilerlemeyi kaydedin.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

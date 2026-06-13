import React, { useState } from 'react';
import { Camera, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { Recipe } from '../types';
import { INITIAL_CATEGORIES } from '../data';
import { motion } from 'motion/react';

interface AddRecipeScreenProps {
  onPublishRecipe: (newRecipe: Recipe) => void;
  onNavigateToTab: (tab: 'home' | 'recipes' | 'add' | 'saved' | 'profile') => void;
}

// Preset stock images the user can choose from when adding a recipe
const PRE_SELECTED_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400', label: 'Et Tabağı / Kebap' },
  { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', label: 'Pizza / Hamur İşi' },
  { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400', label: 'Çikolatalı sufle / Kek' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400', label: 'Makarna / İtalyan' },
  { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', label: 'Taze Sağlıklı Salata' },
  { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400', label: 'Tavada Pankek / Unlu Mamul' },
];

export default function AddRecipeScreen({ onPublishRecipe, onNavigateToTab }: AddRecipeScreenProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('aksam');
  const [duration, setDuration] = useState('45');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErrorMsg('Lütfedip bir Tarif Adı girin.');
      return;
    }
    if (!ingredientsText) {
      setErrorMsg('Lütfen malzemeleri girin (Her satıra bir adet).');
      return;
    }
    if (!instructionsText) {
      setErrorMsg('Lütfen hazırlık adımlarını girin.');
      return;
    }

    const durationNum = parseInt(duration) || 30;

    // Split materials and preparation lines
    const ingredients = ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const instructions = instructionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Pick a default gorgeous image if none is selected
    const chosenImage = imageUrl || PRE_SELECTED_IMAGES[Math.floor(Math.random() * PRE_SELECTED_IMAGES.length)].url;

    const newRecipe: Recipe = {
      id: `custom_${Date.now()}`,
      title,
      description: `${title} tarifinin ev yapımı detaylı anlatımı.`,
      category,
      image: chosenImage,
      duration: durationNum,
      difficulty: durationNum < 30 ? 'Kolay' : durationNum < 50 ? 'Orta' : 'Zor',
      servings: 4,
      ingredients,
      instructions,
      isFavorite: false,
      authorName: 'Şef Arda Yılmaz', // Created by currently logged in user
      authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      tags: ['Benim Tarifim'],
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onPublishRecipe(newRecipe);
    setSuccess(true);
    setErrorMsg('');

    setTimeout(() => {
      onNavigateToTab('recipes');
    }, 1500);
  };

  return (
    <div id="add-recipe-root" className="pb-24 pt-4 px-4 bg-warm-cream min-h-screen">
      {/* Title Header */}
      <div id="add-recipe-header" className="mb-6 px-1">
        <h2 id="add-recipe-main-title" className="text-2xl font-black text-stone-800 leading-tight">Yeni Tarif Ekle</h2>
        <p id="add-recipe-desc" className="text-stone-500 font-medium text-xs mt-1">Kendi imza lezzetini dünyayla paylaş.</p>
      </div>

      {success && (
        <div id="add-recipe-success-alert" className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl mb-6 font-semibold text-xs flex items-center gap-2.5 animate-bounce">
          <Check size={18} className="text-emerald-600 shrink-0" />
          <span>Mükemmel! Tarifiniz başarıyla yayınlandı. Portföyünüze aktarılıyor...</span>
        </div>
      )}

      {errorMsg && (
        <div id="add-recipe-error-alert" className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl mb-6 font-semibold text-xs flex items-center gap-2.5">
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form id="add-recipe-form" onSubmit={handlePublish} className="space-y-4">
        
        {/* Photo Selection Area */}
        <div id="photo-trigger-block">
          <label className="text-stone-700 text-xs font-bold mb-1.5 block px-1">Yemek Fotoğrafı</label>
          {imageUrl ? (
            <div id="selected-image-preview" className="relative h-44 rounded-3xl overflow-hidden border border-stone-200/50 shadow-sm group">
              <img src={imageUrl} alt="Seçilen Yemek" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setShowImageSelector(true)}
                  className="bg-white text-stone-800 font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-md"
                >
                  <Camera size={14} /> Değiştir
                </button>
              </div>
            </div>
          ) : (
            <button
              id="image-placeholder-btn"
              type="button"
              onClick={() => setShowImageSelector(!showImageSelector)}
              className="w-full h-36 rounded-3xl border-2 border-dashed border-stone-300 bg-stone-50/50 hover:bg-stone-50 flex flex-col items-center justify-center text-stone-500 transition-all cursor-pointer group"
            >
              <Camera size={26} className="text-stone-400 group-hover:scale-105 transition-all mb-2" />
              <span id="photo-placeholder-text" className="text-xs font-bold text-stone-600 px-2 text-center">Yemek Fotoğrafı Ekle</span>
              <span className="text-[10px] text-stone-400 mt-1">Hazır mutfak görsellerinden seçin</span>
            </button>
          )}

          {/* Quick Image Selection Grid */}
          {showImageSelector && (
            <motion.div 
              id="quick-image-grid-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-white border border-stone-200/60 p-4 rounded-2xl shadow-sm"
            >
              <h4 id="quick-image-header" className="text-[11px] font-extrabold text-stone-600 mb-2.5 uppercase tracking-wide">Yemek Türünüze En Uygun Görseli Seçin</h4>
              <div id="quick-image-grid" className="grid grid-cols-3 gap-2">
                {PRE_SELECTED_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(img.url);
                      setShowImageSelector(false);
                    }}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-103 ${imageUrl === img.url ? 'border-primary-brown shadow' : 'border-transparent'}`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-1">
                      <span className="text-[7px] text-white font-extrabold truncate w-full">{img.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Recipe Title Input */}
        <div id="recipe-title-group" className="flex flex-col">
          <label id="recipe-title-label" className="text-stone-700 text-xs font-bold mb-1.5 px-1">Tarif Adı</label>
          <input 
            id="recipe-title-input"
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Anne Köftesi"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
          />
        </div>

        {/* Row of Category & Duration */}
        <div id="recipe-meta-row" className="grid grid-cols-2 gap-4">
          <div id="recipe-category-group" className="flex flex-col">
            <label id="recipe-category-label" className="text-stone-700 text-xs font-bold mb-1.5 px-1">Kategori</label>
            <select
              id="recipe-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
            >
              {INITIAL_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div id="recipe-duration-group" className="flex flex-col">
            <label id="recipe-duration-label" className="text-stone-700 text-xs font-bold mb-1.5 px-1">Hazırlama Süresi</label>
            <div id="recipe-duration-input-wrapper" className="relative flex items-center">
              <input 
                id="recipe-duration-input"
                type="number" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="45"
                min="5"
                max="300"
                className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
              />
              <span className="absolute right-4 text-xs font-bold text-stone-400">dk</span>
            </div>
          </div>
        </div>

        {/* Ingredients Block Textarea */}
        <div id="recipe-ingredients-group" className="flex flex-col">
          <label id="recipe-ingredients-label" className="text-stone-700 text-xs font-bold mb-1.5 px-1">Malzemeler</label>
          <textarea 
            id="recipe-ingredients-textarea"
            rows={4}
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="Her satıra bir malzeme (Örn: 500g kıyma&#10;2 adet domates&#10;Yarım demet maydanoz)"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200/60 rounded-2xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown placeholder:leading-relaxed transition-all resize-none"
          />
        </div>

        {/* Preparation Block Textarea */}
        <div id="recipe-instructions-group" className="flex flex-col">
          <label id="recipe-instructions-label" className="text-stone-700 text-xs font-bold mb-1.5 px-1">Hazırlanışı</label>
          <textarea 
            id="recipe-instructions-textarea"
            rows={4}
            value={instructionsText}
            onChange={(e) => setInstructionsText(e.target.value)}
            placeholder="Adım adım nasıl yapılır anlatın... (Satır başına yeni bir adım girebilirsiniz)"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200/60 rounded-2xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown placeholder:leading-relaxed transition-all resize-none"
          />
        </div>

        {/* Action Button */}
        <button
          id="recipe-publish-btn"
          type="submit"
          className="w-full py-4 bg-primary-brown hover:bg-primary-brown-hover text-white rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] mt-4 flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Tarifi Yayınla
        </button>
      </form>
    </div>
  );
}

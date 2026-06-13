import React, { useState, useEffect } from 'react';
import { Recipe, UserProfile } from './types';
import { INITIAL_RECIPES, CURRENT_USER } from './data';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import RecipesScreen from './components/RecipesScreen';
import AddRecipeScreen from './components/AddRecipeScreen';
import SavedScreen from './components/SavedScreen';
import ProfileScreen from './components/ProfileScreen';
import RecipeDetailScreen from './components/RecipeDetailScreen';
import LucideIcon from './components/LucideIcon';
import { 
  Home, 
  BookOpen, 
  Plus, 
  Heart, 
  User, 
  X, 
  Sparkles, 
  LogOut, 
  ChefHat, 
  Check, 
  BookMarked,
  Info,
  Menu,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Persistence using localStorage
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('sefin_defteri_recipes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Verify if any initial recipes are missing in the retrieved localstorage array and restore them
          const missingRecipes = INITIAL_RECIPES.filter(initial => !parsed.some(p => p.id === initial.id));
          if (missingRecipes.length > 0) {
            return [...parsed, ...missingRecipes];
          }
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse recipes from localstorage', e);
      }
    }
    return INITIAL_RECIPES;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sefin_defteri_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from localstorage', e);
      }
    }
    // Set to null to force authentication screen first as depicted in screenshots
    return null;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'recipes' | 'add' | 'saved' | 'profile'>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appNotification, setAppNotification] = useState('');

  // Save data state changes to localStorage
  useEffect(() => {
    localStorage.setItem('sefin_defteri_recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Fail-safe: verification on mount to inject any newly added initial recipes (like lasagna, drinks) if missing
  useEffect(() => {
    const missing = INITIAL_RECIPES.filter(initial => !recipes.some(r => r.id === initial.id));
    if (missing.length > 0) {
      setRecipes(prev => {
        const actuallyMissing = missing.filter(m => !prev.some(r => r.id === m.id));
        if (actuallyMissing.length > 0) {
          return [...actuallyMissing, ...prev];
        }
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sefin_defteri_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sefin_defteri_user');
    }
  }, [currentUser]);

  // Auth logins handler
  const handleLoginSuccess = (email: string, name?: string) => {
    const loggedInUser: UserProfile = {
      ...CURRENT_USER,
      email,
      name: name || CURRENT_USER.name,
    };
    setCurrentUser(loggedInUser);
    setActiveTab('home');
    triggerNotification('Şef Defterine başarıyla giriş yapıldı! Keyifli pişirmeler! 👨‍🍳');
  };

  // Logouts
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRecipe(null);
    setIsSidebarOpen(false);
    triggerNotification('Oturum sonlandırıldı. Tekrar görüşmek üzere!');
  };

  // Helper trigger banner
  const triggerNotification = (msg: string) => {
    setAppNotification(msg);
    setTimeout(() => {
      setAppNotification('');
    }, 2500);
  };

  // Custom favoriting handler available globally
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop clicking card background or detail trigger
    setRecipes(prevRecipes => {
      const updated = prevRecipes.map(recipe => {
        if (recipe.id === id) {
          const nextState = !recipe.isFavorite;
          if (nextState) {
            triggerNotification(`"${recipe.title}" kaydedilenlere eklendi! ❤️`);
          } else {
            triggerNotification(`"${recipe.title}" kaydedilenlerden çıkarıldı.`);
          }
          return { ...recipe, isFavorite: nextState };
        }
        return recipe;
      });
      
      // Keep selectedRecipe in detail view synced with updated values!
      if (selectedRecipe && selectedRecipe.id === id) {
        const found = updated.find(r => r.id === id);
        if (found) setSelectedRecipe(found);
      }
      return updated;
    });
  };

  // Publish new custom recipe handler
  const handlePublishRecipe = (newRecipe: Recipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
    triggerNotification('Yeni tarif başarıyla eklendi! 🎉');
  };

  // Category filter trigger switcher
  const handleCategoryFilter = (catId: string) => {
    setSelectedCategoryId(catId);
    setActiveTab('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset category filters
  const handleClearCategoryFilter = () => {
    setSelectedCategoryId(null);
  };

  // App Sidebar drawer links
  const sidebarLinks = [
    { label: 'Ana Sayfa', tab: 'home', icon: Home },
    { label: 'Tarif Defteri', tab: 'recipes', icon: BookOpen },
    { label: 'Yeni Tarif Ekle', tab: 'add', icon: Plus },
    { label: 'Kaydedilenler', tab: 'saved', icon: Heart },
    { label: 'Şef Profili', tab: 'profile', icon: User },
  ];

  return (
    <div id="sefin-defteri-app-canvas" className="min-h-screen w-full bg-stone-900/40 relative flex items-center justify-center p-0 md:p-6 select-none bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center">
      {/* Dim backdrop layer for simulator */}
      <div id="backdrop-overlay" className="absolute inset-0 bg-stone-950/85 backdrop-blur-2xl"></div>

      {/* Global In-app Toast banner */}
      <AnimatePresence>
        {appNotification && (
          <motion.div 
            id="global-toast-banner"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-lg border border-stone-800 text-stone-100 text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 max-w-[320px] text-center"
          >
            <Sparkles size={14} className="text-amber-400 shrink-0" />
            <span className="font-semibold">{appNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smartphone Device Frame Simulator - Centered & Rounded */}
      <div 
        id="smartphone-simulator-container"
        className="w-full max-w-sm h-full min-h-screen md:min-h-[812px] md:h-[812px] md:max-h-[812px] bg-warm-cream shadow-2xl rounded-none md:rounded-[48px] overflow-hidden relative border-0 md:border-8 border-stone-800 flex flex-col justify-between"
      >
        {/* Device Notch & Status Bar Decor (Only visible on simulator screen sizes) */}
        <div id="device-notched-header" className="hidden md:flex justify-between items-center px-6 pt-3 pb-1 bg-stone-950 text-stone-300 text-[10px] font-bold z-30 shrink-0">
          <span id="device-time">09:41</span>
          <div id="device-notch" className="w-24 h-4.5 bg-stone-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
          <div id="device-icons-row" className="flex items-center gap-1.5 grayscale opacity-90 scale-90">
            <span>SIG 📶</span>
            <span>WIFI 🛜</span>
            <span>BAT 🔋</span>
          </div>
        </div>

        {/* Sidebar Slide-out Drawer */}
        <AnimatePresence>
          {isSidebarOpen && currentUser && (
            <>
              {/* Dark dim overlay */}
              <motion.div
                id="sidebar-overlay-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs z-40 cursor-pointer"
              ></motion.div>

              {/* Drawer Content */}
              <motion.div
                id="sidebar-drawer-menu"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="absolute top-0 left-0 bottom-0 w-4/5 bg-warm-cream border-r border-stone-200/50 shadow-2xl z-50 p-6 flex flex-col justify-between"
              >
                <div id="sidebar-top-section">
                  {/* Close and title */}
                  <div id="sidebar-header" className="flex items-center justify-between mb-8">
                    <span id="sidebar-logo-text" className="serif-title text-xl font-extrabold text-primary-brown">Şefin Defteri</span>
                    <button 
                      id="sidebar-close-btn"
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 px-1.5 border border-stone-200 hover:bg-stone-100 rounded-full text-stone-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Profile info block */}
                  <div id="sidebar-profile-card" className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-stone-200/40 mb-7 shadow-xs">
                    <div id="sidebar-avatar-wrapper" className="relative shrink-0">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="w-11 h-11 rounded-full object-cover border border-stone-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white rounded-full p-0.5 border border-white">
                        <Check size={8} strokeWidth={3} />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-extrabold text-stone-800 tracking-tight truncate">{currentUser.name}</h4>
                      <span className="text-[10px] text-stone-400 font-bold tracking-tight block mt-0.5 truncate">{currentUser.email}</span>
                    </div>
                  </div>

                  {/* Navigation List links */}
                  <nav id="sidebar-navigation" className="space-y-1.5">
                    {sidebarLinks.map((link) => {
                      const Icon = link.icon;
                      const isCurrentTab = activeTab === link.tab && !selectedRecipe;
                      return (
                        <button
                          key={link.tab}
                          id={`sidebar-link-${link.tab}`}
                          onClick={() => {
                            setActiveTab(link.tab as any);
                            setSelectedRecipe(null);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold tracking-tight transition-all text-left ${
                            isCurrentTab
                              ? 'bg-primary-brown text-white shadow-sm'
                              : 'text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{link.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom utility */}
                <div id="sidebar-footer-section">
                  <div className="p-3 bg-stone-50 border border-stone-100 rounded-xl mb-4 text-[9px] font-bold text-stone-400/90 leading-relaxed flex items-center gap-2">
                    <Info size={14} className="text-stone-400 shrink-0" />
                    <span>Mutfak kültürü ve kadim yemek defteri arşivinizi bulutta saklayın.</span>
                  </div>
                  <button
                    id="sidebar-logout-btn"
                    onClick={handleLogout}
                    className="w-full py-3 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 px-4 transition-all"
                  >
                    <LogOut size={16} />
                    <span>Oturumu Kapat</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Unified App Top Header bar (persistent on top across all main tabs) */}
        {currentUser && !selectedRecipe && (
          <div 
            id="app-top-header" 
            className="flex items-center justify-between px-4 py-3 bg-warm-cream border-b border-stone-200/40 shrink-0 z-30"
          >
            <button 
              id="app-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-stone-50 hover:bg-stone-100 rounded-full border border-stone-200/40 text-stone-700 shadow-sm transition-all"
            >
              <Menu size={20} />
            </button>
            <span 
              id="app-header-title" 
              onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }}
              className="serif-title text-2xl font-extrabold text-primary-brown tracking-tight cursor-pointer hover:opacity-90 select-none pb-0.5"
            >
              Şefin Defteri
            </span>
            <button 
              id="app-search-nav-btn"
              onClick={() => { setActiveTab('recipes'); setSelectedRecipe(null); }}
              className="p-2 bg-stone-50 hover:bg-stone-100 rounded-full border border-stone-200/40 text-stone-700 shadow-sm transition-all"
            >
              <Search size={20} />
            </button>
          </div>
        )}

        {/* Core Screen Router */}
        <div 
          id="device-screen-scrollport" 
          className="flex-1 w-full overflow-y-auto overflow-x-hidden relative scrollbar-none"
        >
          {!currentUser ? (
            <AuthScreen onLoginSuccess={handleLoginSuccess} />
          ) : selectedRecipe ? (
            <RecipeDetailScreen 
              recipe={selectedRecipe}
              onBack={() => setSelectedRecipe(null)}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                {activeTab === 'home' && (
                  <HomeScreen 
                    recipes={recipes}
                    onSelectRecipe={setSelectedRecipe}
                    onToggleFavorite={handleToggleFavorite}
                    onNavigateToTab={setActiveTab}
                    onCategoryFilter={handleCategoryFilter}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                  />
                )}
                
                {activeTab === 'recipes' && (
                  <RecipesScreen 
                    recipes={recipes}
                    onSelectRecipe={setSelectedRecipe}
                    onToggleFavorite={handleToggleFavorite}
                    selectedCategoryId={selectedCategoryId}
                    onClearCategoryFilter={handleClearCategoryFilter}
                  />
                )}

                {activeTab === 'add' && (
                  <AddRecipeScreen 
                    onPublishRecipe={handlePublishRecipe}
                    onNavigateToTab={setActiveTab}
                  />
                )}

                {activeTab === 'saved' && (
                  <SavedScreen 
                    recipes={recipes}
                    onSelectRecipe={setSelectedRecipe}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}

                {activeTab === 'profile' && (
                  <ProfileScreen 
                    user={currentUser}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                    onNavigateToTab={setActiveTab}
                    onLogout={handleLogout}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Simulated Smartphone Bottom Bar Navigation Bar (Only visible after login) */}
        {currentUser && !selectedRecipe && (
          <div 
            id="app-bottom-navbar"
            className="bg-white/95 backdrop-blur-md border-t border-stone-200/40 px-4 py-3.5 flex justify-between items-center shrink-0 z-30 shadow-lg relative rounded-b-none md:rounded-b-[40px]"
          >
            {/* Home Link Tab */}
            <button
              id="tab-btn-home"
              onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <div 
                className={`py-1.5 px-4.5 rounded-full flex items-center gap-1 transition-all ${
                  activeTab === 'home' 
                    ? 'bg-primary-brown text-white font-extrabold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <Home size={18} />
                {activeTab === 'home' && <span className="text-[10px] tracking-tight">Ana Sayfa</span>}
              </div>
            </button>

            {/* Recipes Link Tab */}
            <button
              id="tab-btn-recipes"
              onClick={() => { setActiveTab('recipes'); setSelectedRecipe(null); }}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <div 
                className={`py-1.5 px-4.5 rounded-full flex items-center gap-1 transition-all ${
                  activeTab === 'recipes' 
                    ? 'bg-primary-brown text-white font-extrabold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <BookOpen size={18} />
                {activeTab === 'recipes' && <span className="text-[10px] tracking-tight">Tarifler</span>}
              </div>
            </button>

            {/* Add Link Tab */}
            <button
              id="tab-btn-add"
              onClick={() => { setActiveTab('add'); setSelectedRecipe(null); }}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <div 
                className={`py-1.5 px-4.5 rounded-full flex items-center gap-1 transition-all ${
                  activeTab === 'add' 
                    ? 'bg-primary-brown text-white font-extrabold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <Plus size={18} />
                {activeTab === 'add' && <span className="text-[10px] tracking-tight">Yeni Tarif</span>}
              </div>
            </button>

            {/* Saved Link Tab */}
            <button
              id="tab-btn-saved"
              onClick={() => { setActiveTab('saved'); setSelectedRecipe(null); }}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <div 
                className={`py-1.5 px-4.5 rounded-full flex items-center gap-1 transition-all ${
                  activeTab === 'saved' 
                    ? 'bg-primary-brown text-white font-extrabold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <Heart size={18} />
                {activeTab === 'saved' && <span className="text-[10px] tracking-tight">Favorilerim</span>}
              </div>
            </button>

            {/* Profile Link Tab */}
            <button
              id="tab-btn-profile"
              onClick={() => { setActiveTab('profile'); setSelectedRecipe(null); }}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <div 
                className={`py-1.5 px-4.5 rounded-full flex items-center gap-1 transition-all ${
                  activeTab === 'profile' 
                    ? 'bg-primary-brown text-white font-extrabold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <User size={18} />
                {activeTab === 'profile' && <span className="text-[10px] tracking-tight">Profil</span>}
              </div>
            </button>
          </div>
        )}

        {/* Bottom indicator line on simulated screens */}
        <div id="device-bottom-indicator" className="hidden md:block w-32 h-1 bg-stone-800 rounded-full mx-auto my-1.5 shrink-0 z-30"></div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Menu, Search, Share2, Check, Sparkles, Heart, LogOut } from 'lucide-react';
import { UserProfile } from '../types';
import { CURRENT_USER, PROFILE_POPULAR_IMAGES } from '../data';
import { motion } from 'motion/react';

interface ProfileScreenProps {
  user?: UserProfile;
  onOpenSidebar: () => void;
  onNavigateToTab: (tab: 'home' | 'recipes' | 'add' | 'saved' | 'profile') => void;
  onLogout: () => void;
}

export default function ProfileScreen({ user = CURRENT_USER, onOpenSidebar, onNavigateToTab, onLogout }: ProfileScreenProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [successToast, setSuccessToast] = useState('');

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setFollowersCount("12.8k + 1");
      setSuccessToast(`${user.name} takip edilmeye başlandı!`);
    } else {
      setFollowersCount(user.followersCount);
      setSuccessToast('');
    }
    setTimeout(() => {
      setSuccessToast('');
    }, 2000);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: user.name,
        text: user.bio,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setSuccessToast('Profil linki panoya kopyalandı!');
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
        setSuccessToast('');
      }, 2000);
    }
  };

  return (
    <div id="profile-screen-root" className="pb-24 pt-4 px-4 bg-warm-cream min-h-screen">
      {/* Toast Notification */}
      {successToast && (
        <div id="profile-toast" className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-50 text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Sparkles size={13} className="text-amber-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Profile Detail Block */}
      <div id="profile-details-card" className="flex flex-col items-center text-center px-2 mb-6">
        {/* Profile Large Avatar Wrapper */}
        <div id="profile-avatar-circle" className="relative w-24 h-24 mb-3.5">
          <img 
            id="profile-avatar-img"
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full object-cover rounded-full border-3 border-white shadow-md"
            referrerPolicy="no-referrer"
          />
          {/* Chef Verified Check Badge */}
          <div id="chef-verified-badge" className="absolute bottom-0 right-1 bg-amber-600 border border-white text-white p-1 rounded-full shadow-sm flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </div>
        </div>

        {/* Chef Name */}
        <h3 id="profile-chef-name" className="text-xl font-extrabold text-stone-800 tracking-tight mb-2">
          {user.name}
        </h3>

        {/* Bio */}
        <p id="profile-bio" className="text-xs text-stone-500 font-medium leading-relaxed max-w-[280px] mb-5">
          {user.bio}
        </p>

        {/* Stats Column */}
        <div id="profile-stats-row" className="flex justify-around w-full max-w-[260px] py-3.5 border-y border-stone-200/60 mb-5 text-stone-700">
          <div id="stat-recipes" className="flex flex-col items-center">
            <span id="stat-recipes-num" className="text-sm font-extrabold text-primary-brown">{user.recipesCount}</span>
            <span id="stat-recipes-label" className="text-[10px] font-bold text-stone-400 mt-0.5">Tarifler</span>
          </div>
          <div id="stat-separator-left" className="h-7 w-[1px] bg-stone-200 self-center"></div>
          <div id="stat-followers" className="flex flex-col items-center">
            <span id="stat-followers-num" className="text-sm font-extrabold text-primary-brown">{followersCount}</span>
            <span id="stat-followers-label" className="text-[10px] font-bold text-stone-400 mt-0.5">Takipçiler</span>
          </div>
          <div id="stat-separator-right" className="h-7 w-[1px] bg-stone-200 self-center"></div>
          <div id="stat-following" className="flex flex-col items-center">
            <span id="stat-following-num" className="text-sm font-extrabold text-primary-brown">{user.followingCount}</span>
            <span id="stat-following-label" className="text-[10px] font-bold text-stone-400 mt-0.5">Takip</span>
          </div>
        </div>

        {/* Dynamic Follow Buttons */}
        <div id="profile-button-row" className="flex gap-2.5 w-full max-w-[260px]">
          <button
            id="profile-follow-toggle-btn"
            onClick={handleFollowToggle}
            className={`flex-1 py-3 rounded-full font-bold text-xs shadow-sm transition-all tracking-wide ${
              isFollowing 
                ? 'bg-stone-200 hover:bg-stone-300/80 text-stone-700' 
                : 'bg-primary-brown hover:bg-primary-brown-hover text-white shadow-md transform active:scale-98'
            }`}
          >
            {isFollowing ? 'Takibi Bırak' : 'Takip Et'}
          </button>
          
          <button
            id="profile-share-btn"
            onClick={handleShareProfile}
            className="p-3 bg-white border border-stone-200 hover:bg-stone-50 rounded-full text-stone-600 shadow-xs transition-all flex items-center justify-center shrink-0"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Outlined Logout Button */}
        <div id="profile-logout-row" className="w-full max-w-[260px] mt-2.5">
          <button
            id="profile-logout-btn"
            onClick={onLogout}
            className="w-full py-2.5 bg-red-50 hover:bg-red-100/80 border border-red-200 text-red-600 rounded-full font-extrabold text-[11px] shadow-xs transition-all tracking-wider flex items-center justify-center gap-1.5 transform active:scale-98"
          >
            <LogOut size={13} strokeWidth={2.5} />
            <span>OTURUMU KAPAT</span>
          </button>
        </div>
      </div>

      {/* Popular Recipes Grid (Popüler Tarifler) */}
      <div id="profile-popular-gallery" className="mt-4">
        <div id="profile-popular-title-row" className="flex items-center justify-between mb-3 px-1">
          <h4 id="profile-popular-title" className="text-stone-800 text-sm font-extrabold tracking-tight">Popüler Tarifler</h4>
          <div id="profile-popular-title-line" className="h-[1px] bg-stone-200 flex-1 ml-4"></div>
        </div>

        {/* Bento Grid / Modular Masonry style Layout of Popular Recipes */}
        <div id="profile-gallery-grid" className="grid grid-cols-2 gap-3.5">
          {PROFILE_POPULAR_IMAGES.map((imgUrl, index) => (
            <motion.div
              id={`profile-gallery-item-${index}`}
              key={index}
              whileHover={{ scale: 1.01 }}
              // Vary grid-spans for dynamic visual masonry effect as shown in mockup
              className={`rounded-[22px] overflow-hidden shadow-sm relative cursor-pointer group bg-stone-100 ${
                index === 2 ? 'col-span-2 aspect-video' : 'aspect-square'
              }`}
            >
              <img 
                id={`profile-gallery-img-${index}`}
                src={imgUrl} 
                alt={`Lezzet Tabağı ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div id={`profile-gallery-overlay-${index}`} className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                <span id={`profile-gallery-desc-${index}`} className="text-[10px] font-bold tracking-tight">Tarifi İncele</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

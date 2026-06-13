import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (email: string, name?: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('chef@mutfak.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Şef Arda Yılmaz');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Lütfen tüm alanları doldurun.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (isSignUp && !fullName) {
      setErrorMsg('Lütfen adınızı ve soyadınızı girin.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg(isSignUp ? 'Kaydınız başarıyla tamamlandı! Giriş yapılıyor...' : 'Giriş başarılı! Hoş geldiniz...');
    
    setTimeout(() => {
      onLoginSuccess(email, isSignUp ? fullName : undefined);
    }, 1200);
  };

  const skipAuth = () => {
    onLoginSuccess('chef@mutfak.com', 'Şef Arda Yılmaz');
  };

  return (
    <div id="auth-screen-container" className="relative min-h-screen bg-warm-cream flex flex-col justify-between overflow-x-hidden">
      {/* Top Background Image */}
      <div 
        id="auth-hero-image"
        className="w-full h-80 bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600')" 
        }}
      >
        <div id="auth-hero-overlay" className="absolute inset-0 bg-black/10"></div>
        {/* Curved cutout at bottom */}
        <div 
          id="auth-hero-curve"
          className="absolute bottom-0 left-0 right-0 h-10 bg-warm-cream"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        ></div>
      </div>

      {/* Main Form Panel */}
      <motion.div 
        id="auth-form-panel"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 px-6 pb-8 -mt-8 relative z-10 flex flex-col justify-between"
      >
        <div id="auth-header" className="text-center mb-6">
          <h1 id="auth-title" className="serif-title text-4xl font-extrabold text-primary-brown tracking-tight mb-2">
            Şefin Defteri
          </h1>
          <p id="auth-subtitle" className="text-stone-500 font-medium text-sm">
            Mutfaktaki mirasınızı dijitalleştirin.
          </p>
        </div>

        {errorMsg && (
          <div id="auth-error-block" className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 mb-4 font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div id="auth-success-block" className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-100 mb-4 font-medium flex items-center gap-2">
            <Sparkles size={14} className="animate-spin text-emerald-600" />
            {successMsg}
          </div>
        )}

        <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div id="auth-name-group" className="flex flex-col">
              <label id="auth-name-label" className="text-stone-700 text-xs font-semibold mb-1.5 px-1">Ad Soyad</label>
              <div id="auth-name-input-wrapper" className="relative flex items-center">
                <span className="absolute left-4 text-stone-400">
                  <Sparkles size={18} />
                </span>
                <input 
                  id="auth-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Şef Can Yılmaz"
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
                />
              </div>
            </div>
          )}

          <div id="auth-email-group" className="flex flex-col">
            <label id="auth-email-label" className="text-stone-700 text-xs font-semibold mb-1.5 px-1">E-posta</label>
            <div id="auth-email-input-wrapper" className="relative flex items-center">
              <span className="absolute left-4 text-stone-400">
                <Mail size={18} />
              </span>
              <input 
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@mutfak.com"
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
              />
            </div>
          </div>

          <div id="auth-pass-group" className="flex flex-col">
            <div id="auth-pass-header" className="flex justify-between items-center mb-1.5 px-1">
              <label id="auth-pass-label" className="text-stone-700 text-xs font-semibold">Şifre</label>
              {!isSignUp && (
                <button 
                  id="auth-forgot-btn"
                  type="button" 
                  onClick={() => alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi (Simülasyon).')}
                  className="text-primary-brown text-xs font-semibold hover:underline"
                >
                  Şifremi Unuttum
                </button>
              )}
            </div>
            <div id="auth-pass-input-wrapper" className="relative flex items-center">
              <span className="absolute left-4 text-stone-400">
                <Lock size={18} />
              </span>
              <input 
                id="auth-pass-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........"
                className="w-full pl-11 pr-12 py-3 bg-stone-50 border border-stone-200/60 rounded-full text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-brown/30 focus:border-primary-brown transition-all"
              />
              <button
                id="auth-pass-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full py-3.5 bg-primary-brown hover:bg-primary-brown-hover text-white rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
          >
            {isSignUp ? 'Kayıt Ol ve Giriş Yap' : 'Giriş Yap'}
          </button>
        </form>

        {/* Separator */}
        <div id="auth-separator" className="relative flex py-5 items-center">
          <div id="auth-sep-line-left" className="flex-grow border-t border-stone-200"></div>
          <span id="auth-sep-text" className="flex-shrink mx-4 text-stone-400 text-xs font-medium bg-warm-cream">veya</span>
          <div id="auth-sep-line-right" className="flex-grow border-t border-stone-200"></div>
        </div>

        {/* Social Logins */}
        <div id="auth-social-row" className="grid grid-cols-2 gap-3 mb-6">
          <button 
            id="auth-google-btn"
            type="button" 
            onClick={skipAuth}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-full text-xs font-bold text-stone-700 shadow-sm transition-all"
          >
            <span id="google-logo" className="w-4 h-4 flex items-center justify-center bg-white rounded-full text-[10px] shadow-sm font-mono text-blue-500 border border-stone-100">G</span>
            Google
          </button>
          <button 
            id="auth-apple-btn"
            type="button" 
            onClick={skipAuth}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-full text-xs font-bold text-stone-700 shadow-sm transition-all"
          >
            <span id="apple-logo" className="text-stone-900 text-sm">🍎</span>
            Apple
          </button>
        </div>

        {/* Guest Walkthrough bypass */}
        <button 
          id="auth-guest-bypass"
          onClick={skipAuth}
          className="text-stone-400 hover:text-stone-600 text-xs font-medium text-center self-center hover:underline mb-4"
        >
          Konuk olarak devam et ve uygulamayı keşfet
        </button>

        {/* Footer Toggle */}
        <div id="auth-footer" className="text-center text-xs text-stone-500">
          {isSignUp ? (
            <p id="auth-footer-login-text">
              Zaten hesabın var mı?{' '}
              <button 
                id="auth-switch-to-login"
                type="button" 
                onClick={() => setIsSignUp(false)} 
                className="text-primary-brown font-bold hover:underline ml-1"
              >
                Giriş Yap
              </button>
            </p>
          ) : (
            <p id="auth-footer-signup-text">
              Hesabın yok mu?{' '}
              <button 
                id="auth-switch-to-signup"
                type="button" 
                onClick={() => setIsSignUp(true)} 
                className="text-primary-brown font-bold hover:underline ml-1"
              >
                Kayıt Ol
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

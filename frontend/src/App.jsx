import React, { useState, useEffect } from 'react';
import { Globe, Package, Loader2, CheckCircle } from 'lucide-react';

const API_URL = 'http://localhost:8000/api';

// API Service
const api = {
  async getProducts(language = 'en') {
    const response = await fetch(`${API_URL}/products?lang=${language}`);
    return response.json();
  },

  async getLanguages() {
    const response = await fetch(`${API_URL}/languages`);
    return response.json();
  }
};

// Language data with names
const POPULAR_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  // { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  // { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  //{ code: 'pt', name: 'Português', flag: '🇵🇹' },
  //{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
  //{ code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  // { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  // { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
];

function App() {
  const [products, setProducts] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [translationStatus, setTranslationStatus] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([POPULAR_LANGUAGES[0]]); // Default to English

  useEffect(() => {
    loadLanguages();
    loadProducts(currentLanguage);
  }, []);

  const loadLanguages = async () => {
    try {
      const result = await api.getLanguages();
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        // Filter POPULAR_LANGUAGES to include only those supported by the backend
        // Also always include English ('en') as a fallback
        const supported = POPULAR_LANGUAGES.filter(lang =>
          lang.code === 'en' || result.data.some(apiLang => apiLang.code === lang.code)
        );
        setAvailableLanguages(supported.length > 0 ? supported : POPULAR_LANGUAGES);
      } else {
        setAvailableLanguages(POPULAR_LANGUAGES);
      }
    } catch (error) {
      console.error('Failed to load languages:', error);
      // Fallback: If API fails, just show all languages
      setAvailableLanguages(POPULAR_LANGUAGES);
    }
  };

  const loadProducts = async (lang) => {
    setLoading(true);
    setTranslationStatus('');

    const startTime = Date.now();

    try {
      const result = await api.getProducts(lang);
      const loadTime = Date.now() - startTime;

      setProducts(result.data);

      if (lang !== 'en') {
        if (loadTime < 500) {
          setTranslationStatus('✓ Loaded from cache (instant)');
        } else {
          setTranslationStatus('✓ Translated and cached');
        }
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
    loadProducts(langCode);
  };

  const currentLangData = POPULAR_LANGUAGES.find(l => l.code === currentLanguage) || POPULAR_LANGUAGES[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/10 p-2 rounded-xl">
                <Package className="w-8 h-8 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lucky Dragon Technology</h1>
                <p className="text-sm text-slate-500 font-medium">Industrial Manufacturing Solutions</p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Globe className="w-5 h-5 text-slate-600" />
                <span className="text-xl">{currentLangData.flag}</span>
                <span className="font-semibold text-slate-700">{currentLangData.name}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-[32rem] overflow-y-auto z-50 py-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors ${currentLanguage === lang.code ? 'bg-blue-50/50 text-blue-700' : 'text-slate-700'
                        }`}
                    >
                      <span className="text-2xl shadow-sm rounded-sm overflow-hidden">{lang.flag}</span>
                      <span className="font-medium text-lg">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <CheckCircle className="w-5 h-5 ml-auto text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Translation Status */}
          {translationStatus && (
            <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {translationStatus}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 mb-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {currentLanguage === 'en' ? 'Premium Industrial Products' :
                loading ? 'Loading...' : 'Premium Industrial Products'}
            </h2>
            <p className="text-slate-300 text-xl max-w-2xl font-light">
              {currentLanguage === 'en' ? 'Certified manufacturing solutions for global markets' :
                loading ? '' : 'Certified manufacturing solutions for global markets'}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-600">Translating to {currentLangData.name}...</span>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100/50"
              >
                <div className="h-56 bg-white flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex-1 leading-tight group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h3>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold ml-3 shadow-sm border border-blue-100">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-slate-500 mb-6 leading-relaxed text-sm h-10 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-5 border-t border-slate-50">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        {!loading && products.length > 0 && currentLanguage !== 'en' && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 text-sm">
              Showing content in <strong>{currentLangData.name}</strong>
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            Lucky Dragon Technology Co. Ltd © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
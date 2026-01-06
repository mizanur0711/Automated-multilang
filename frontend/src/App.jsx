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
      if (result.success && Array.isArray(result.data)) {
        // Filter POPULAR_LANGUAGES to include only those supported by the backend
        // Also always include English ('en') as a fallback
        const supported = POPULAR_LANGUAGES.filter(lang =>
          lang.code === 'en' || result.data.some(apiLang => apiLang.code === lang.code)
        );
        setAvailableLanguages(supported.length > 0 ? supported : [POPULAR_LANGUAGES[0]]);
      }
    } catch (error) {
      console.error('Failed to load languages:', error);
      // Fallback: If API fails, just show English to prevent broken translations
      setAvailableLanguages([POPULAR_LANGUAGES[0]]);
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
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">GlobalExport Co.</h1>
                <p className="text-sm text-slate-500">Industrial Manufacturing Solutions</p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-2xl">{currentLangData.flag}</span>
                <span className="font-medium">{currentLangData.name}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 max-h-96 overflow-y-auto">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <CheckCircle className="w-4 h-4 ml-auto" />
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            {currentLanguage === 'en' ? 'Premium Industrial Products' :
              loading ? 'Loading...' : 'Premium Industrial Products'}
          </h2>
          <p className="text-blue-100 text-lg">
            {currentLanguage === 'en' ? 'Certified manufacturing solutions for global markets' :
              loading ? '' : 'Certified manufacturing solutions for global markets'}
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">
                      {product.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold ml-2">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-sm font-medium text-slate-500">
                      {product.category}
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      {currentLanguage === 'en' ? 'Request Quote' : 'Request Quote'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        {!loading && products.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              🌍 Translation System Active
            </h3>
            <p className="text-blue-800 text-sm">
              Current language: <strong>{currentLangData.name}</strong> •
              Showing {products.length} products •
              {currentLanguage !== 'en' && ' Translations cached for instant loading'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            GlobalExport Co. © 2026 • Supporting 50+ languages with LibreTranslate
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
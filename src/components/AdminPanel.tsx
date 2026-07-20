import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Eye,
  FileText,
  Tag,
  Save,
  FolderPlus,
  Sparkles,
  Search,
  CheckCircle,
  AlertCircle,
  Lock,
  LogOut,
  Home,
  ShieldAlert,
  Eye as EyeIcon,
  EyeOff,
} from "lucide-react";
import { Article, Category } from "../types";
import {
  getArticles,
  getCategories,
  saveArticle,
  deleteArticle,
  saveCategory,
  deleteCategory,
  resetToDefaults,
} from "../services/api";

const SESSION_KEY = "admin_authenticated";

const PRESET_COVERS = [
  { name: "Sun'iy Intellekt", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop" },
  { name: "Texnologiya & Kod", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
  { name: "Ma'lumotlar tahlili", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { name: "Kompyuter Ko'rishi", url: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop" },
  { name: "Robototexnika", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop" },
];

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────

function AdminLoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Brief loading animation
    await new Promise((r) => setTimeout(r, 600));

    const adminPassword = import.meta.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      setError("ADMIN_PASSWORD muhit o'zgaruvchisi sozlanmagan.");
      setIsLoading(false);
      return;
    }

    if (password === adminPassword) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onSuccess();
    } else {
      setError("Parol noto'g'ri. Qaytadan urinib ko'ring.");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background mesh gradients */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
          
          {/* Logo */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-slate-950 rounded-full flex items-center justify-center border border-white/10">
                <Lock className="h-3 w-3 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-slate-100 uppercase">
                AI YANGILIKLARI
              </h1>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Security notice */}
          <div className="flex items-start space-x-2.5 p-3 bg-indigo-500/8 border border-indigo-500/20 rounded-xl">
            <ShieldAlert className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-indigo-300/80 leading-relaxed">
              Bu sahifa faqat vakolatli adminlar uchun. Ruxsatsiz kirish urinishlari qayd etiladi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                Admin Paroli
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="w-full px-4 py-3 pr-12 bg-black/40 border border-white/10 focus:border-cyan-500/80 text-slate-100 rounded-xl focus:outline-none placeholder-slate-600 transition-colors text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl animate-fade-in">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                <p className="text-xs text-rose-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Tekshirilmoqda...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Kirish</span>
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="text-center">
            <button
              onClick={() => { window.location.hash = ""; }}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center space-x-1.5 mx-auto"
            >
              <Home className="h-3 w-3" />
              <span>Bosh sahifaga qaytish</span>
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] text-slate-600 mt-6 font-mono">
          © 2026 AI Yangiliklari · Yashirin Admin Panel
        </p>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL (authenticated) ──────────────────────────────────────────────

export default function AdminPanel({ onDataChange }: { onDataChange: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"articles" | "categories">("articles");

  // Data States
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Search / Filters
  const [articleSearch, setArticleSearch] = useState("");

  // Article Form Modal State
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [formArticle, setFormArticle] = useState<Partial<Article>>({});
  const [formCategorySlug, setFormCategorySlug] = useState<string>("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Category Form State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Feedback Messages
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Check session on mount
  useEffect(() => {
    const auth = sessionStorage.getItem(SESSION_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data when authenticated
  const loadData = async () => {
    const artRes = await getArticles();
    if (artRes.data) setArticles(artRes.data);
    const catRes = await getCategories();
    if (catRes.data) setCategories(catRes.data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Article Actions
  const handleOpenNewArticle = () => {
    setFormArticle({
      title: "",
      content: `## Yangi maqola sarlavhasi\nYangi maqola matnini bu yerga yozishingiz mumkin. Bu yerda **qalin**, *kursiv* matnlar yoki \`kod\` bloklarini ishlatish imkoni bor.\n\n### Bo'lim sarlavhasi\n1. Birinchi band\n2. Ikkinchi band`,
      excerpt: "",
      coverImageUrl: PRESET_COVERS[0].url,
      author: {
        name: "Anvar Karimov",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
      },
    });
    setFormCategorySlug("");
    setIsPreviewMode(false);
    setIsArticleFormOpen(true);
  };

  const handleOpenEditArticle = (article: Article) => {
    setFormArticle({ ...article });
    setFormCategorySlug(article.category?.slug || "");
    setIsPreviewMode(false);
    setIsArticleFormOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formArticle.title || !formArticle.content) {
      showToast("Iltimos, sarlavha va maqola matnini kiriting!", "error");
      return;
    }
    const selectedCat = categories.find((c) => c.slug === formCategorySlug);
    const finalArticle: Partial<Article> = {
      ...formArticle,
      category: selectedCat ? { name: selectedCat.name, slug: selectedCat.slug } : null,
    };
    const res = await saveArticle(finalArticle);
    if (res.success) {
      showToast(formArticle.id ? "Maqola muvaffaqiyatli yangilandi!" : "Yangi maqola yaratildi!");
      setIsArticleFormOpen(false);
      loadData();
      onDataChange();
    } else {
      showToast(res.error || "Saqlashda xatolik yuz berdi", "error");
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (window.confirm("Haqiqatan ham ushbu maqolani o'chirmoqchimisiz?")) {
      const res = await deleteArticle(id);
      if (res.success) {
        showToast("Maqola muvaffaqiyatli o'chirildi!");
        loadData();
        onDataChange();
      } else {
        showToast(res.error || "O'chirishda xatolik", "error");
      }
    }
  };

  // Category Actions
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      showToast("Kategoriya nomini yozing!", "error");
      return;
    }
    const res = await saveCategory({ name: newCategoryName.trim() });
    if (res.success) {
      showToast("Yangi kategoriya qo'shildi!");
      setNewCategoryName("");
      loadData();
      onDataChange();
    } else {
      showToast(res.error || "Xatolik yuz berdi", "error");
    }
  };

  const handleStartEditCategory = (cat: Category) => {
    setEditingCategory({ ...cat });
  };

  const handleSaveCategoryEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name?.trim()) return;
    const res = await saveCategory(editingCategory);
    if (res.success) {
      showToast("Kategoriya nomi o'zgartirildi!");
      setEditingCategory(null);
      loadData();
      onDataChange();
    } else {
      showToast(res.error || "Xatolik yuz berdi", "error");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Haqiqatan ham ushbu kategoriyani o'chirmoqchimisiz? Maqolalar o'chmaydi, lekin turkumdan chiqariladi.")) {
      const res = await deleteCategory(id);
      if (res.success) {
        showToast("Kategoriya muvaffaqiyatli o'chirildi!");
        loadData();
        onDataChange();
      } else {
        showToast(res.error || "O'chirishda xatolik", "error");
      }
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Barcha maqolalar va turkumlarni o'chirib, dastlabki holatga qaytarmoqchimisiz? Siz kiritgan ma'lumotlar o'chib ketadi!")) {
      resetToDefaults();
      showToast("Ma'lumotlar dastlabki holatga muvaffaqiyatli qaytarildi!");
      loadData();
      onDataChange();
    }
  };

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(articleSearch.toLowerCase())
  );

  // ── Show Login screen if not authenticated ──────────────────────────────────
  if (!isAuthenticated) {
    return <AdminLoginScreen onSuccess={handleLoginSuccess} />;
  }

  // ── Admin Dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background mesh */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-100px] w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-black tracking-wider text-slate-100 uppercase">
                AI YANGILIKLARI
              </p>
              <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
                Boshqaruv Paneli
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-1.5 text-xs bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Dastlabki holatga qaytarish"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dastlabki holat</span>
            </button>
            <button
              onClick={() => { window.location.hash = ""; }}
              className="px-3.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Bosh sahifaga qaytish"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sayt</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Chiqish"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Panel Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col" style={{ minHeight: "80vh" }}>
          
          {/* Tab Controls */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5 bg-black/20">
            <div className="flex space-x-1 p-0.5 bg-white/5 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab("articles")}
                className={`flex items-center space-x-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "articles"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Maqolalar ({articles.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex items-center space-x-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "categories"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Kategoriyalar ({categories.length})</span>
              </button>
            </div>

            {activeTab === "articles" && (
              <button
                onClick={handleOpenNewArticle}
                className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-semibold rounded-xl text-white flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi maqola</span>
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {activeTab === "articles" ? (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Maqolalarni qidirish..."
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Articles List */}
                <div className="border border-white/5 rounded-2xl bg-black/20 overflow-hidden">
                  {filteredArticles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
                      <FileText className="w-12 h-12 text-slate-600" />
                      <p className="text-slate-400 text-sm">Hech qanday maqola topilmadi.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filteredArticles.map((art) => (
                        <div
                          key={art.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <img
                              src={art.coverImageUrl}
                              alt={art.title}
                              className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0 space-y-1">
                              <h4 className="text-sm font-bold text-slate-100 truncate pr-4">
                                {art.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
                                <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-cyan-400">
                                  {art.category ? art.category.name : "Kategoriyasiz"}
                                </span>
                                <span>•</span>
                                <span>{art.readingTime}</span>
                                <span>•</span>
                                <span>{new Date(art.publishedAt).toLocaleDateString("uz-UZ")}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 sm:shrink-0 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => handleOpenEditArticle(art)}
                              className="p-2 bg-white/5 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-white/10 hover:border-indigo-500/20 rounded-xl transition-all cursor-pointer"
                              title="Tahrirlash"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-2 bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/20 rounded-xl transition-all cursor-pointer"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // CATEGORIES TAB
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center space-x-2 text-indigo-400 text-sm font-bold">
                    <FolderPlus className="w-4 h-4" />
                    <span>Kategoriya Qo'shish</span>
                  </div>
                  <form onSubmit={handleCreateCategory} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">Nomi</label>
                      <input
                        type="text"
                        placeholder="Masalan: Mashinali Ta'lim"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-slate-100"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold text-white transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Qo'shish</span>
                    </button>
                  </form>
                </div>

                <div className="md:col-span-2 border border-white/10 rounded-2xl bg-black/20 overflow-hidden divide-y divide-white/5">
                  <div className="p-4 bg-white/5 border-b border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Mavjud Kategoriyalar
                    </h4>
                  </div>
                  {categories.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      Kategoriyalar mavjud emas.
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                      >
                        {editingCategory && editingCategory.id === cat.id ? (
                          <form onSubmit={handleSaveCategoryEdit} className="flex-1 flex items-center space-x-2">
                            <input
                              type="text"
                              value={editingCategory.name || ""}
                              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                              className="flex-1 px-3 py-1 text-xs bg-slate-900 border border-indigo-500 rounded-lg text-slate-100 focus:outline-none"
                              autoFocus
                            />
                            <button type="submit" className="p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white cursor-pointer" title="Saqlash">
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button type="button" onClick={() => setEditingCategory(null)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        ) : (
                          <>
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-slate-200">{cat.name}</span>
                              <div className="text-[10px] font-mono text-slate-500">slug: {cat.slug}</div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button onClick={() => handleStartEditCategory(cat)} className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" title="Tahrirlash">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" title="O'chirish">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ARTICLE FORM MODAL */}
      {isArticleFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col overflow-hidden animate-fade-in p-4 sm:p-6">
          <div className="max-w-4xl w-full mx-auto bg-slate-950 border border-white/10 rounded-3xl h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  {formArticle.id ? "Maqolani Tahrirlash" : "Yangi Maqola Yozish"}
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isPreviewMode ? "Tahrirlash" : "Markdown Ko'rish"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsArticleFormOpen(false)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 border border-white/10 rounded-xl cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveArticle} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                {isPreviewMode ? (
                  <div className="space-y-6 max-w-3xl mx-auto py-4">
                    <div className="space-y-3">
                      {formCategorySlug && (
                        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full font-mono">
                          {categories.find((c) => c.slug === formCategorySlug)?.name || ""}
                        </span>
                      )}
                      <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {formArticle.title || "Sarlavha belgilanmagan"}
                      </h1>
                    </div>
                    <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
                      <img src={formArticle.coverImageUrl} alt="Muqova" className="w-full h-full object-cover" />
                    </div>
                    {formArticle.excerpt && (
                      <p className="text-slate-300 text-sm italic border-l-2 border-indigo-500 pl-4 py-1">
                        {formArticle.excerpt}
                      </p>
                    )}
                    <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {formArticle.content || "*Maqola matni bo'sh*"}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Maqola Sarlavhasi</label>
                      <input
                        type="text"
                        placeholder="Yangi va qiziqarli texnologik maqola sarlavhasi..."
                        value={formArticle.title || ""}
                        onChange={(e) => setFormArticle({ ...formArticle, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-sm text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Kategoriya</label>
                        <select
                          value={formCategorySlug}
                          onChange={(e) => setFormCategorySlug(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-xs text-white"
                        >
                          <option value="" className="bg-slate-900 text-slate-300">Kategoriyani tanlang...</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.slug} className="bg-slate-900 text-slate-100">
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Author Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Muallif Ismi</label>
                        <input
                          type="text"
                          placeholder="Muallif ismi..."
                          value={formArticle.author?.name || ""}
                          onChange={(e) =>
                            setFormArticle({
                              ...formArticle,
                              author: {
                                name: e.target.value,
                                avatarUrl:
                                  formArticle.author?.avatarUrl ||
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Qisqa Tavsif (Excerpt)</label>
                      <textarea
                        placeholder="Maqola ro'yxatida ko'rinadigan qisqacha mazmun..."
                        value={formArticle.excerpt || ""}
                        onChange={(e) => setFormArticle({ ...formArticle, excerpt: e.target.value })}
                        className="w-full h-16 px-3 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-xs text-slate-200"
                      />
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Muqova Rasm URL</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/..."
                          value={formArticle.coverImageUrl || ""}
                          onChange={(e) => setFormArticle({ ...formArticle, coverImageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl focus:outline-none text-xs text-slate-200 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-500 uppercase font-mono">Tezkor rasmlar:</span>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COVERS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setFormArticle({ ...formArticle, coverImageUrl: preset.url })}
                              className={`px-2.5 py-1 text-[10px] rounded-lg border transition-all cursor-pointer ${
                                formArticle.coverImageUrl === preset.url
                                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                                  : "bg-white/5 border-white/5 hover:border-white/10 text-slate-400"
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Maqola Matni (Markdown)</label>
                      <textarea
                        placeholder="Maqolangizni Markdown formatida bu yerga yozing..."
                        value={formArticle.content || ""}
                        onChange={(e) => setFormArticle({ ...formArticle, content: e.target.value })}
                        className="w-full h-64 sm:h-80 px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-2xl focus:outline-none text-xs sm:text-sm text-slate-100 font-mono leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="p-5 border-t border-white/10 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsArticleFormOpen(false)}
                  className="flex-1 py-2.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-all cursor-pointer"
                >
                  Bekor qilish
                </button>
                {!isPreviewMode && (
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Maqolani saqlash</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[99] p-4 bg-slate-900 border border-white/15 rounded-2xl shadow-xl flex items-center space-x-3 max-w-sm animate-fade-in backdrop-blur-md">
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          )}
          <span className="text-xs font-medium text-slate-100">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

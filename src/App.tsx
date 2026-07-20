import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import {
  getArticles,
  getArticleBySlug,
  getCategories,
  getRelatedArticles,
} from "./services/api";
import { Article, Category } from "./types";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import AdminPanel from "./components/AdminPanel";
import {
  HeroSkeleton,
  CardSkeleton,
  PostDetailSkeleton,
} from "./components/SkeletonLoader";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const parseUrlHash = (url: string) => {
  if (!url) return { cleanUrl: url, width: undefined, height: undefined, align: undefined };
  try {
    const hashIndex = url.indexOf('#');
    if (hashIndex === -1) return { cleanUrl: url, width: undefined, height: undefined, align: undefined };
    
    const cleanUrl = url.substring(0, hashIndex);
    const hash = url.substring(hashIndex + 1);
    
    let width: string | undefined = undefined;
    let height: string | undefined = undefined;
    let align: string | undefined = undefined;
    
    const params = hash.split(/[;&]/);
    for (const param of params) {
      const parts = param.split(/[=-]/);
      const key = (parts[0] || '').trim().toLowerCase();
      const val = (parts[1] || '').trim();
      
      if (key === 'w' || key === 'width') {
        width = val.match(/^(?:[0-9]+)(?:%|px|vw|em|rem)?$/) 
          ? (val.match(/[a-zA-Z%]/) ? val : `${val}%`)
          : val;
      } else if (key === 'h' || key === 'height') {
        height = val.match(/^(?:[0-9]+)(?:%|px|vh|em|rem)?$/)
          ? (val.match(/[a-zA-Z%]/) ? val : `${val}px`)
          : val;
      } else if (key === 'left' || key === 'right' || key === 'center') {
        align = key;
      } else if (val === 'left' || val === 'right' || val === 'center') {
        align = val;
      }
    }
    return { cleanUrl, width, height, align };
  } catch (e) {
    return { cleanUrl: url, width: undefined, height: undefined, align: undefined };
  }
};

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.add("light-mode");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light-mode");
    } else {
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light-mode");
    }
  };

  // Navigation & Router State
  const [activeView, setActiveView] = useState<"home" | "article" | "admin">("home");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Content States
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  // Filtering / UI States
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" ");

  // Loaders & Errors
  const [loading, setLoading] = useState<boolean>(true);
  const [activeArticleLoading, setActiveArticleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger state update when data changes in Admin Panel
  const [refreshVersion, setRefreshVersion] = useState<number>(0);

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === "#/adminai") {
        // Admin sahifasiga yo'naltirish
        setActiveView("admin");
        setActiveSlug(null);
        setActiveArticle(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash.startsWith("#/article/")) {
        const slug = hash.replace("#/article/", "");
        setActiveView("article");
        setActiveSlug(slug);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setActiveView("home");
        setActiveSlug(null);
        setActiveArticle(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Load Categories
  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      if (result.data) setCategories(result.data);
    }
    fetchCategories();
  }, [refreshVersion]);

  // Load Articles
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      const cleanQuery = searchQuery.trim();
      const result = await getArticles(selectedCategory, cleanQuery);
      if (result.error) {
        setError(result.error);
        setArticles([]);
      } else {
        setArticles(result.data);
      }
      setLoading(false);
    }

    const debounceTimer = setTimeout(() => {
      fetchArticles();
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery, refreshVersion]);

  // Load single article
  useEffect(() => {
    if (!activeSlug) return;

    async function fetchSingleArticle() {
      setActiveArticleLoading(true);
      const result = await getArticleBySlug(activeSlug!);
      if (result.data) {
        setActiveArticle(result.data);
        const related = await getRelatedArticles(result.data, 3);
        setRelatedArticles(related);
      } else {
        setActiveArticle(null);
      }
      setActiveArticleLoading(false);
    }

    fetchSingleArticle();
  }, [activeSlug, refreshVersion]);

  const handleDataChange = () => {
    setRefreshVersion((prev) => prev + 1);
  };

  const goHome = () => {
    window.location.hash = "";
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const markdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1
        className="text-3xl font-bold text-slate-100 mt-8 mb-4 tracking-tight border-b border-slate-800 pb-2 font-sans"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2
        className="text-2xl font-bold text-slate-100 mt-7 mb-4 tracking-tight font-sans"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-3 font-sans" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="text-slate-300 text-base leading-relaxed mb-5" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-slate-300" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-slate-300" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-slate-300 leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-indigo-500 pl-4 py-2 my-5 bg-slate-900/60 rounded-r-xl italic text-slate-400"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }: any) => {
      const isInline = !className;
      return isInline ? (
        <code
          className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-400 font-mono text-xs border border-slate-800"
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto my-6 font-mono text-xs leading-relaxed text-slate-300">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-slate-800 bg-slate-900/20">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="bg-slate-900/80 border-b border-slate-800 px-4 py-3 text-left font-semibold text-slate-200"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border-b border-slate-800/50 px-4 py-3 text-slate-300" {...props}>
        {children}
      </td>
    ),
    a: ({ children, ...props }: any) => (
      <a
        className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors font-medium"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }: any) => {
      const { cleanUrl, width, height, align } = parseUrlHash(src);
      const youtubeId = getYouTubeId(cleanUrl);
      if (youtubeId) {
        return (
          <div
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl my-6 bg-slate-950"
            style={{
              width: width || '100%',
              marginLeft: align === 'right' ? 'auto' : align === 'left' ? '0' : 'auto',
              marginRight: align === 'left' ? 'auto' : align === 'right' ? '0' : 'auto'
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={alt || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        );
      }
      return (
        <span
          className="block my-6 space-y-2"
          style={{
            width: width || '100%',
            marginLeft: align === 'right' ? 'auto' : align === 'left' ? '0' : 'auto',
            marginRight: align === 'left' ? 'auto' : align === 'right' ? '0' : 'auto'
          }}
        >
          <img
            src={cleanUrl}
            alt={alt}
            className="w-full rounded-2xl border border-white/10 shadow-lg object-cover"
            style={{ height: height || 'auto', maxHeight: height ? 'none' : '480px' }}
            referrerPolicy="no-referrer"
            {...props}
          />
          {alt && <span className="block text-center text-xs text-slate-500 font-sans italic">{alt}</span>}
        </span>
      );
    },
  };

  const featuredArticle =
    selectedCategory === "all" && searchQuery.trim() === "" && articles.length > 0
      ? articles[0]
      : null;

  const gridArticles = featuredArticle ? articles.slice(1) : articles;

  // ── Admin view: full page takeover ─────────────────────────────────────────
  if (activeView === "admin") {
    return (
      <AdminPanel
        onDataChange={handleDataChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // ── Public site view ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-indigo-200 relative overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-200px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Header */}
      <Header
        searchQuery={searchQuery === " " ? "" : searchQuery}
        onSearchChange={(q) => setSearchQuery(q === "" ? " " : q)}
        onGoHome={goHome}
        isSinglePostView={activeView === "article"}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* Single post view */}
        {activeView === "article" ? (
          activeArticleLoading ? (
            <PostDetailSkeleton />
          ) : activeArticle ? (
            <div className="space-y-8 py-4 animate-fade-in max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={goHome}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-slate-100 border border-white/10 rounded-xl transition-all duration-200 text-xs font-semibold cursor-pointer group backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>

              {/* Title & Metadata */}
              <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                {activeArticle.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full font-mono">
                    {activeArticle.category.name}
                  </span>
                )}
                <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 py-2 text-slate-400 border-t border-white/5 pt-6 mt-6">
                  <div className="flex items-center space-x-3">
                    {activeArticle.author.avatarUrl && (
                      <img
                        src={activeArticle.author.avatarUrl}
                        alt={activeArticle.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{activeArticle.author.name}</p>
                      <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Muallif</p>
                    </div>
                  </div>

                  <div className="h-4 w-px bg-white/10 hidden sm:block" />

                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{formatDate(activeArticle.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{activeArticle.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="w-full aspect-[21/9] sm:h-[380px] rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-xl relative">
                <img
                  src={activeArticle.coverImageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Rich Content */}
              <div className="max-w-3xl mx-auto py-4 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
                <div className="markdown-body">
                  <Markdown components={markdownComponents}>{activeArticle.content}</Markdown>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="border-t border-white/10 pt-12 mt-12 space-y-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-slate-100">O'xshash maqolalar</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((article) => (
                      <PostCard
                        key={article.id}
                        article={article}
                        onClick={() => {
                          window.location.hash = `#/article/${article.slug}`;
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 space-y-4 animate-fade-in bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md max-w-lg mx-auto">
              <AlertTriangle className="w-16 h-16 text-rose-500" />
              <h2 className="text-2xl font-bold text-slate-100">Maqola topilmadi</h2>
              <p className="text-slate-400 max-w-sm px-4">
                Siz so'ragan maqola o'chirilgan yoki manzili o'zgargan bo'lishi mumkin.
              </p>
              <button
                onClick={goHome}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 rounded-xl font-medium transition-colors text-sm text-white"
              >
                Bosh sahifaga qaytish
              </button>
            </div>
          )
        ) : (
          /* Home View */
          <div className="space-y-12 animate-fade-in">

            {/* Hero Featured Article */}
            {loading ? (
              <HeroSkeleton />
            ) : (
              featuredArticle && (
                <div
                  onClick={() => {
                    window.location.hash = `#/article/${featuredArticle.slug}`;
                  }}
                  className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-[420px] md:h-[500px] flex items-end p-6 md:p-12 mb-12 cursor-pointer group shadow-xl backdrop-blur-md"
                >
                  <div className="absolute inset-0">
                    <img
                      src={featuredArticle.coverImageUrl}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />
                  </div>

                  <div className="relative z-10 w-full max-w-3xl space-y-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white uppercase tracking-widest font-mono">
                        So'nggi yangilik
                      </span>
                      {featuredArticle.category && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 backdrop-blur-md border border-white/10 text-cyan-400 uppercase tracking-widest font-mono">
                          {featuredArticle.category.name}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors duration-200">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-3 leading-relaxed font-normal">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 gap-4">
                      <div className="flex items-center space-x-3">
                        {featuredArticle.author.avatarUrl && (
                          <img
                            src={featuredArticle.author.avatarUrl}
                            alt={featuredArticle.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-slate-100">{featuredArticle.author.name}</p>
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Muallif</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(featuredArticle.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{featuredArticle.readingTime}</span>
                        </div>
                        <div className="hidden sm:flex items-center space-x-1 text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                          <span>O'qish</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Categories Filter */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Kategoriyalar</h3>
                  <p className="text-xs text-slate-500">Mavzular bo'yicha saralangan maqolalar</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-5 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-slate-200 backdrop-blur-sm"
                    }`}
                  >
                    Barchasi
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-5 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        selectedCategory === cat.slug
                          ? "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-slate-200 backdrop-blur-sm"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : gridArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {gridArticles.map((article) => (
                    <PostCard
                      key={article.id}
                      article={article}
                      onClick={() => {
                        window.location.hash = `#/article/${article.slug}`;
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md max-w-md mx-auto">
                  <Search className="w-12 h-12 text-slate-600" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-300">Hech narsa topilmadi</h3>
                    <p className="text-xs text-slate-500 max-w-sm px-4">
                      Kechirasiz, tanlangan turkumda yoki kalit so'z bo'yicha hech qanday yangilik topilmadi.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery(" ");
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold border border-white/10 rounded-xl transition-colors backdrop-blur-sm"
                  >
                    Barcha maqolalarga qaytish
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-black/40 backdrop-blur-md py-10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
              AI BLOG
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Sun'iy intellekt va eng so'nggi texnologiyalar olami yangiliklarini boshqarish tizimi bilan taqdim etuvchi zamonaviy blog platformasi.
          </p>
          <div className="pt-2 text-[11px] text-slate-600 font-mono">
            <span>© 2026 AI Blog</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

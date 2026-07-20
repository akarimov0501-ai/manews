import React from "react";
import { Article } from "../types";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

interface PostCardProps {
  article: Article;
  onClick: () => void;
}

export default function PostCard({ article, onClick }: PostCardProps) {
  // Format published date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const categoryColors: Record<string, string> = {
    llm: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "computer-vision": "bg-purple-500/10 text-purple-400 border-purple-500/30",
    "ai-tools": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    biznes: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };

  const getCategoryStyle = (slug: string | undefined) => {
    if (!slug) return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    return categoryColors[slug.toLowerCase()] || "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
  };

  return (
    <article
      id={`post-card-${article.id}`}
      className="group flex flex-col h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.25)] cursor-pointer backdrop-blur-md"
      onClick={onClick}
    >
      {/* Cover Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-950 p-2 pb-0">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Soft dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Hover Action Indicator */}
        <div className="absolute top-5 right-5 p-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Metadata: Category & Reading Time */}
          <div className="flex items-center justify-between text-xs font-medium">
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] uppercase tracking-wider font-semibold ${getCategoryStyle(
                article.category?.slug
              )}`}
            >
              {article.category?.name || "AI"}
            </span>
            <div className="flex items-center text-slate-400 space-x-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors duration-200">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Author & Published Date */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center space-x-2.5">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-medium text-slate-300 truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center text-[11px] font-mono text-slate-500 space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

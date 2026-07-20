import React from "react";

export function HeroSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 animate-pulse h-[400px] md:h-[500px] flex items-end p-6 md:p-12 mb-12">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="relative z-10 w-full max-w-3xl space-y-4">
        {/* Category tag skeleton */}
        <div className="h-6 w-24 bg-slate-800 rounded-full" />
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-8 md:h-10 w-full bg-slate-800 rounded-lg" />
          <div className="h-8 md:h-10 w-4/5 bg-slate-800 rounded-lg" />
        </div>
        {/* Excerpt skeleton */}
        <div className="space-y-1 pt-2">
          <div className="h-4 w-full bg-slate-800 rounded" />
          <div className="h-4 w-5/6 bg-slate-800 rounded" />
        </div>
        {/* Author / Date skeleton */}
        <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/50">
          <div className="w-10 h-10 rounded-full bg-slate-800" />
          <div className="space-y-2">
            <div className="h-3 w-28 bg-slate-800 rounded" />
            <div className="h-3 w-20 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden animate-pulse h-full">
      {/* Cover Image skeleton */}
      <div className="h-48 bg-slate-800 w-full" />
      {/* Content wrapper */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category & reading time */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-16 bg-slate-800 rounded-full" />
            <div className="h-3 w-16 bg-slate-800 rounded" />
          </div>
          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-slate-800 rounded" />
            <div className="h-5 w-11/12 bg-slate-800 rounded" />
          </div>
          {/* Excerpt */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-4/5 bg-slate-800/80 rounded" />
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-slate-800" />
          <div className="space-y-1.5 flex-1">
            <div className="h-2.5 w-24 bg-slate-800 rounded" />
            <div className="h-2.5 w-16 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8 py-8">
      {/* Back button skeleton */}
      <div className="h-9 w-24 bg-slate-800 rounded-lg" />

      {/* Header Info */}
      <div className="space-y-4 max-w-3xl">
        <div className="h-6 w-20 bg-slate-800 rounded-full" />
        <div className="h-10 md:h-12 w-full bg-slate-800 rounded-lg" />
        <div className="h-10 md:h-12 w-3/4 bg-slate-800 rounded-lg" />

        {/* Author info */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-3.5 w-24 bg-slate-800 rounded" />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[350px] md:h-[500px] bg-slate-800 rounded-2xl" />

      {/* Content layout */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="h-4 w-full bg-slate-800 rounded" />
        <div className="h-4 w-11/12 bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-800 rounded" />
        <div className="h-4 w-4/5 bg-slate-800 rounded" />
        <div className="h-4 w-11/12 bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-800 rounded" />
        <div className="h-8 w-1/3 bg-slate-800 rounded-md pt-4" />
        <div className="h-4 w-full bg-slate-800 rounded" />
        <div className="h-4 w-5/6 bg-slate-800 rounded" />
      </div>
    </div>
  );
}

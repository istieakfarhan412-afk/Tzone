import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Monitor, Shirt, Sparkles, ChevronRight, Zap, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Editorial Hero Split Layout */}
      <section className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left: Tech Section (3/5) */}
        <div className="w-full lg:w-3/5 bg-zinc-950 p-8 lg:p-16 flex flex-col relative group">
          <div className="absolute -right-24 top-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="z-10 flex flex-col h-full animate-slide-up">
            <span className="text-emerald-400 font-mono text-xs tracking-widest-plus uppercase mb-6 underline underline-offset-8">
              High Performance Tech
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-8 max-w-lg">
              RAW<br/>POWER<br/><span className="text-zinc-800">STATION</span>
            </h2>
            
            <div className="mt-auto flex flex-col md:flex-row items-start md:items-end gap-8">
              <div className="bg-zinc-900 border border-zinc-800 p-8 w-full md:w-80 shadow-2xl">
                <div className="text-[10px] text-emerald-400 font-bold mb-3 uppercase tracking-widest-plus">Recommended Build</div>
                <div className="text-white font-bold mb-6 text-sm uppercase leading-tight">RTX 4090 Elite - i9 14th Gen Gaming Rig</div>
                <Link to="/pc-builder" className="group flex items-center justify-between w-full py-4 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors px-6">
                  Start Builder
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="pb-2">
                <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] font-medium italic">
                  "Authentic components with manufacturer warranty. Dhaka same-day delivery available."
                </p>
              </div>
            </div>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000 pointer-events-none"
            alt="Hardware"
          />
        </div>

        {/* Right: Multi-Niche Column (2/5) */}
        <div className="w-full lg:w-2/5 flex flex-col">
          
          {/* Skincare Section (Clean Teal/Editorial) */}
          <div className="flex-1 bg-teal-50 p-8 lg:p-12 flex flex-col border-l border-zinc-200">
            <div className="flex justify-between items-start">
              <h3 className="text-5xl font-serif italic text-teal-950 tracking-tight leading-[0.9]">
                Clinical<br/>Precision
              </h3>
              <span className="px-4 py-1 bg-teal-900 text-white text-[9px] font-black tracking-widest-plus uppercase">Derma Lab</span>
            </div>
            <p className="text-teal-900/60 text-sm mt-6 max-w-xs font-medium leading-relaxed italic">
              Targeted solutions for tropical skin. COSRX, The Ordinary, and CeraVe authentic imports.
            </p>
            <div className="mt-auto pt-8">
              <Link to="/skin-guide" className="text-teal-950 text-xs font-black uppercase tracking-widest flex items-center gap-2 group border-b-2 border-teal-950/20 pb-2 w-fit hover:border-teal-950 transition-all">
                Discover Your Routine
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Fashion Section (Minimal White/Black) */}
          <div className="flex-1 bg-white p-8 lg:p-12 flex flex-col border-l border-t border-zinc-200">
            <h3 className="text-5xl font-black text-black tracking-tighter uppercase leading-[0.9]">
              Modern<br/>Threads
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Oversized T\'s', 'Techwear', 'Active'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-zinc-100 text-zinc-900 text-[9px] uppercase font-bold tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-8 flex items-center justify-between">
              <Link to="/products/Fashion" className="h-14 w-14 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <ShoppingBag size={20} />
              </Link>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">New Arrivals 24'</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar (BD Specific) */}
      <section className="bg-zinc-100 border-y border-zinc-200 py-4">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-10 items-center">
            <div className="flex items-center gap-3 grayscale opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-8 h-5 bg-pink-600 rounded flex items-center justify-center text-[8px] text-white font-bold">bK</div>
              <span className="text-[10px] font-bold uppercase tracking-widest">bKash / Nagad Accepted</span>
            </div>
            <div className="h-4 w-px bg-zinc-300 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase text-zinc-900 tracking-widest group">
                Cash on Delivery <span className="text-zinc-400">Available</span>
              </span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" /> SSLCommerz Secured
            </span>
          </div>
        </div>
      </section>

      {/* Featured Collections Feed */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <span className="text-emerald-500 font-mono text-[10px] uppercase font-bold tracking-widest mb-4 inline-block">Curated Selection</span>
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">New Drops</h2>
            </div>
            <Link to="/products/Tech" className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-emerald-500 hover:border-emerald-500 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Minimal Grid Cards would go here, continuing the theme */}
          </div>
        </div>
      </section>
    </div>
  );
};

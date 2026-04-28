import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Search, User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { user, signInWithGoogle, logout, isAdmin } = useAuth();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Collections', path: '/products/Tech' },
    { name: 'PC Builder', path: '/pc-builder' },
    { name: 'Skin Guide', path: '/skin-guide' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <h1 className="text-2xl font-black tracking-tighter text-black uppercase">
            TZONE<span className="text-emerald-500 transition-all group-hover:scale-150 inline-block">.</span>BD
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-emerald-500 ${
                location.pathname === link.path ? 'text-black' : 'text-zinc-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end border-r border-zinc-200 pr-6">
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Customer Support</span>
            <span className="text-xs font-black">+880 17...</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative p-2 text-black hover:text-emerald-500 transition-colors">
              <ShoppingBag size={20} strokeWidth={2.5} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <button 
                  onClick={logout} 
                  className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center text-white hover:bg-emerald-500 transition-all overflow-hidden"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle} 
                className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-black hover:bg-zinc-200 transition-all"
              >
                <LogIn size={20} />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-black ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold uppercase tracking-tighter text-gray-800 hover:text-accent-tech"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

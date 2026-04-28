import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, CreditCard, Truck, RefreshCw } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link to="/" className="text-3xl font-bold tracking-tighter uppercase mb-6 block">
              Tzone <span className="text-gray-600">BD</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Bangladesh's leading destination for Premium Tech, Curated Fashion, and Dermatological Skincare. Quality and authenticity guaranteed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent-tech transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent-tech transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent-tech transition-colors"><Youtube size={20} /></a>
              <a href="#" className="hover:text-accent-tech transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Categories</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link to="/products/Tech" className="hover:text-accent-tech transition-colors">Computer & Components</Link></li>
              <li><Link to="/products/Tech" className="hover:text-accent-tech transition-colors">Gaming Gadgets</Link></li>
              <li><Link to="/products/Fashion" className="hover:text-accent-fashion transition-colors">Men's Apparel</Link></li>
              <li><Link to="/products/Skincare" className="hover:text-accent-skincare transition-colors">Dermatology Range</Link></li>
              <li><Link to="/pc-builder" className="hover:text-white transition-colors">Custom PC Builder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Support & Info</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy (BD)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Join the Niche</h3>
            <p className="text-gray-400 text-sm mb-6">Stay updated on the latest tech drops and fashion releases.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-gray-900 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-accent-tech w-full"
              />
              <button className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent-tech transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <Truck className="text-accent-tech" />
            <div>
              <p className="text-xs font-bold uppercase">Nationwide Delivery</p>
              <p className="text-[10px] text-gray-500">Fastest shipping across BD</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="text-accent-tech" />
            <div>
              <p className="text-xs font-bold uppercase">7-Day Return</p>
              <p className="text-[10px] text-gray-500">Hassle-free exchange policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CreditCard className="text-accent-tech" />
            <div>
              <p className="text-xs font-bold uppercase">Secure Payments</p>
              <p className="text-[10px] text-gray-500">bKash, Nagad & Rocket</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest text-gray-600">
          <p>© 2024 Tzone BD. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

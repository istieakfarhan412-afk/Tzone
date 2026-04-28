import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { PCBuilder } from './pages/PCBuilder';
import { SkinGuide } from './pages/SkinGuide';
import { Cart } from './pages/Cart';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ShoppingBag, MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/pc-builder" element={<PCBuilder />} />
                <Route path="/skin-guide" element={<SkinGuide />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <a
              href="https://wa.me/8801234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-24 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle size={28} />
            </a>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-40">
              <Link to="/" className="flex flex-col items-center gap-1 text-xs">
                <span className="text-gray-600">Home</span>
              </Link>
              <Link to="/products/Tech" className="flex flex-col items-center gap-1 text-xs">
                <span className="text-gray-600">Tech</span>
              </Link>
              <Link to="/products/Fashion" className="flex flex-col items-center gap-1 text-xs">
                <span className="text-gray-600">Fashion</span>
              </Link>
              <Link to="/products/Skincare" className="flex flex-col items-center gap-1 text-xs">
                <span className="text-gray-600">Skincare</span>
              </Link>
            </nav>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ShoppingCart, Heart, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  images: string[];
  brand: string;
  attributes: any;
}

export const Products = () => {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubCat, setActiveSubCat] = useState('All');

  // Mock data for initial buildup if DB is empty
  const MOCK_PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'NVIDIA RTX 4090 FE',
      description: 'The ultimate GPU for gamers and creators.',
      price: 220000,
      category: 'Tech',
      subCategory: 'GPU',
      brand: 'NVIDIA',
      images: ['https://images.unsplash.com/photo-1662991035790-252fc111c828?q=80&w=2072&auto=format&fit=crop'],
      attributes: {}
    },
    {
      id: '2',
      name: 'Oversized Cargo Jacket',
      description: 'Premium streetwear jacket with multiple pockets.',
      price: 4500,
      category: 'Fashion',
      subCategory: 'Outerwear',
      brand: 'Tzone Wear',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop'],
      attributes: {}
    },
    {
      id: '3',
      name: 'Salicylic Acid 2% Solution',
      description: 'Targeted care for blemish-prone skin.',
      price: 1200,
      category: 'Skincare',
      subCategory: 'Serums',
      brand: 'Dermacare',
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop'],
      attributes: {}
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'products'), where('category', '==', category));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        if (data.length === 0) {
          setProducts(MOCK_PRODUCTS.filter(p => p.category === category));
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts(MOCK_PRODUCTS.filter(p => p.category === category));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubCat = activeSubCat === 'All' || p.subCategory === activeSubCat;
    return matchesSearch && matchesSubCat;
  });

  const subCategories = ['All', ...new Set(products.map(p => p.subCategory))];

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
        <div>
          <span className="text-emerald-500 font-mono text-[10px] uppercase font-bold tracking-widest-plus mb-4 inline-block">Official Collection</span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">{category}</h1>
          <p className="text-zinc-500 text-sm mt-4 font-medium uppercase tracking-widest">Showing {filteredProducts.length} Premium results</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search catalog..."
              className="pl-12 pr-6 py-4 border border-zinc-200 rounded-none w-full sm:w-72 focus:outline-none focus:border-black bg-white transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-zinc-100">
        {subCategories.map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSubCat(sub)}
            className={`pb-4 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
              activeSubCat === sub ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-black'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-zinc-100 aspect-[3/4] mb-6" />
              <div className="h-4 bg-zinc-100 w-3/4 mb-2" />
              <div className="h-4 bg-zinc-100 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                  <Heart size={18} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-black text-white py-4 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-black transition-colors shadow-2xl"
                  >
                    <ShoppingCart size={16} /> Add to Bag
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{product.brand}</span>
                <span className="text-sm font-black">৳{product.price.toLocaleString()}</span>
              </div>
              <h3 className={`font-black text-xl uppercase tracking-tighter group-hover:text-emerald-500 transition-colors line-clamp-1 ${category === 'Skincare' ? 'font-serif normal-case italic tracking-normal' : ''}`}>
                {product.name}
              </h3>
              <p className="text-zinc-500 text-xs mt-2 font-medium leading-relaxed line-clamp-2">{product.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

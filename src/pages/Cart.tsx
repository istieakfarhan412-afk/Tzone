import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    district: 'Dhaka',
    address: ''
  });

  const shippingCost = shippingInfo.district === 'Dhaka' ? 60 : 120;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Cart Items / Forms */}
        <div className="flex-grow">
          {/* Checkout Steps */}
          <div className="flex items-center gap-4 mb-12">
            <span className={`text-xs font-bold uppercase tracking-widest ${step >= 1 ? 'text-black' : 'text-gray-300'}`}>01 Bag</span>
            <div className="h-[1px] w-8 bg-gray-200" />
            <span className={`text-xs font-bold uppercase tracking-widest ${step >= 2 ? 'text-black' : 'text-gray-300'}`}>02 Shipping</span>
            <div className="h-[1px] w-8 bg-gray-200" />
            <span className={`text-xs font-bold uppercase tracking-widest ${step >= 3 ? 'text-black' : 'text-gray-300'}`}>03 Payment</span>
          </div>

          {step === 1 && (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold uppercase tracking-tight">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">Unit Price: ৳{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="p-4 border border-gray-200 focus:border-black outline-none"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="p-4 border border-gray-200 focus:border-black outline-none"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                />
                <select 
                  className="p-4 border border-gray-200 focus:border-black outline-none"
                  value={shippingInfo.district}
                  onChange={(e) => setShippingInfo({...shippingInfo, district: e.target.value})}
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Detailed Address" 
                  className="p-4 border border-gray-200 focus:border-black outline-none"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-6 border-2 border-black flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BKash_Logo.svg/1200px-BKash_Logo.svg.png" className="w-8" alt="bKash" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-sm">bKash</span>
                  </div>
                  <CheckCircle className="text-black" />
                </button>
                <button className="p-6 border border-gray-200 flex items-center justify-between hover:border-black grayscale hover:grayscale-0 transition-all">
                  <div className="flex items-center gap-4">
                    <Truck size={24} />
                    <span className="font-bold uppercase tracking-widest text-sm">Cash on Delivery</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-gray-50 p-8">
            <h2 className="text-xl font-bold uppercase tracking-tighter mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping (BD)</span>
                <span className="font-bold">৳{shippingCost}</span>
              </div>
              <div className="h-[1px] bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span className="font-bold uppercase tracking-widest text-xs">Total</span>
                <span className="text-2xl font-bold">৳{(total + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => step < 3 ? setStep(step + 1) : alert('Order Placed Successfully!')}
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent-tech hover:text-black transition-all"
            >
              {step === 3 ? 'Place Order' : 'Next Step'} <ArrowRight size={18} />
            </button>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase font-bold">
                <ShieldCheck size={14} className="text-green-500" /> Secure Checkout
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase font-bold">
                <Truck size={14} className="text-blue-500" /> Free Returns in 7 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

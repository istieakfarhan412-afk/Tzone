import React, { useState } from 'react';
import { Cpu, Monitor, Zap, HardDrive, Database, Box, CheckCircle2, ChevronRight, Share2, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Component {
  id: string;
  name: string;
  price: number;
  type: string;
  specs: any;
}

const COMPONENTS: Component[] = [
  { id: 'c1', name: 'Intel Core i9-13900K', price: 65000, type: 'CPU', specs: { socket: 'LGA1700' } },
  { id: 'c2', name: 'AMD Ryzen 9 7950X', price: 62000, type: 'CPU', specs: { socket: 'AM5' } },
  { id: 'g1', name: 'NVIDIA RTX 4080', price: 145000, type: 'GPU', specs: {} },
  { id: 'm1', name: 'ASUS ROG Strix Z790-E', price: 48000, type: 'Motherboard', specs: { socket: 'LGA1700' } },
  { id: 'm2', name: 'MSI MAG B650 Tomahawk', price: 28000, type: 'Motherboard', specs: { socket: 'AM5' } },
];

const STEPS = [
  { type: 'CPU', icon: <Cpu size={20} />, title: 'Processor' },
  { type: 'Motherboard', icon: <Box size={20} />, title: 'Motherboard' },
  { type: 'GPU', icon: <Monitor size={20} />, title: 'Graphics Card' },
  { type: 'RAM', icon: <Zap size={20} />, title: 'Memory' },
  { type: 'Storage', icon: <Database size={20} />, title: 'Storage' },
];

export const PCBuilder = () => {
  const [selected, setSelected] = useState<{ [key: string]: Component }>({});
  const [activeStep, setActiveStep] = useState(0);

  const handleSelect = (component: Component) => {
    // Compatibility check
    if (component.type === 'Motherboard' && selected['CPU']) {
      if (component.specs.socket !== selected['CPU'].specs.socket) {
        alert(`Incompatible! This board uses ${component.specs.socket} but your CPU needs ${selected['CPU'].specs.socket}`);
        return;
      }
    }
    
    setSelected(prev => ({ ...prev, [component.type]: component }));
    if (activeStep < STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const totalPrice = Object.values(selected).reduce((sum: number, item: Component) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Component Selection */}
        <div className="flex-grow">
          <div className="mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">PC Builder v1.0</h1>
            <p className="text-gray-500">Select compatible components for your dream rig.</p>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {STEPS.map((step, idx) => (
              <button
                key={step.type}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-6 py-3 border whitespace-nowrap transition-all ${
                  activeStep === idx 
                    ? 'bg-black text-white border-black shadow-lg scale-105 z-10' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-black'
                }`}
              >
                {step.icon}
                <span className="text-xs font-bold uppercase tracking-widest">{step.title}</span>
                {selected[step.type] && <CheckCircle2 size={16} className="text-green-500" />}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {COMPONENTS.filter(c => c.type === STEPS[activeStep].type).length > 0 ? (
                  COMPONENTS.filter(c => c.type === STEPS[activeStep].type).map(comp => (
                    <div
                      key={comp.id}
                      onClick={() => handleSelect(comp)}
                      className={`p-6 border cursor-pointer transition-all ${
                        selected[comp.type]?.id === comp.id 
                          ? 'border-accent-tech bg-accent-tech/5'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      <h3 className="font-bold text-lg mb-1">{comp.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">Specs: {JSON.stringify(comp.specs)}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">৳{comp.price.toLocaleString()}</span>
                        <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                          {selected[comp.type]?.id === comp.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">Loading more {STEPS[activeStep].title} options...</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-28 bg-black text-white p-8 rounded-none brutal-border border-accent-tech shadow-[8px_8px_0px_#00FF00]">
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 flex items-center justify-between">
              Your Build <Monitor className="text-accent-tech" />
            </h2>
            
            <div className="flex flex-col gap-4 mb-8">
              {STEPS.map(step => (
                <div key={step.type} className="flex justify-between items-center py-2 border-b border-white/10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{step.title}</p>
                    <p className="text-sm font-bold truncate max-w-[150px]">
                      {selected[step.type]?.name || 'Not Selected'}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-accent-tech">
                    {selected[step.type] ? `৳${selected[step.type].price.toLocaleString()}` : '-'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest text-gray-400">Estimated Total</span>
                <span className="text-3xl font-bold text-accent-tech">৳{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                disabled={Object.keys(selected).length === 0}
                className="w-full bg-accent-tech text-black py-4 font-bold uppercase tracking-widest hover:invert transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add All to Cart
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-white/20 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-all">
                  <Share2 size={14} /> Share
                </button>
                <button className="flex items-center justify-center gap-2 border border-white/20 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-all">
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

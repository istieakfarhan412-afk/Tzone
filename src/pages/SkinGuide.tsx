import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, Droplets, Wind, Sun, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const QUESTIONS = [
  {
    id: 1,
    text: "How does your skin feel in the afternoon?",
    options: [
      { text: "Shiny and oily all over", type: "oily" },
      { text: "Tight, flaky or dull", type: "dry" },
      { text: "Oily in the T-zone (forehead, nose, chin) but dry elsewhere", type: "combination" },
      { text: "Comfortable and balanced", type: "normal" }
    ]
  },
  {
    id: 2,
    text: "How often do you experience breakouts?",
    options: [
      { text: "Frequently, all over", type: "oily" },
      { text: "Rarely, mostly due to products", type: "dry" },
      { text: "Sometimes, mainly in the T-zone", type: "combination" },
      { text: "Almost never", type: "normal" }
    ]
  },
  {
    id: 3,
    text: "How do your pores look?",
    options: [
      { text: "Large and visible everywhere", type: "oily" },
      { text: "Small, almost invisible", type: "dry" },
      { text: "Large in T-zone, small on cheeks", type: "combination" },
      { text: "Average size", type: "normal" }
    ]
  }
];

const RESULTS: { [key: string]: any } = {
  oily: {
    title: "Oily Skin",
    description: "Your skin produces excess sebum, leading to shine and potential breakouts.",
    routine: ["Salicylic Acid Cleanser", "Niacinamide Serum", "Oil-free Moisturizer", "Matte Sunscreen"],
    color: "bg-teal-500"
  },
  dry: {
    title: "Dry Skin",
    description: "Your skin lacks natural oils and moisture, leading to a tight or flaky feeling.",
    routine: ["Hydrating Milky Cleanser", "Hyaluronic Acid Serum", "Rich Ceramide Cream", "Moisturizing Sunscreen"],
    color: "bg-blue-500"
  },
  combination: {
    title: "Combination Skin",
    description: "You have both oily and dry areas, typically oily in the T-zone.",
    routine: ["Gentle Gel Cleanser", "Vitamin C Serum", "Lightweight Water Cream", "Broad Spectrum SPF"],
    color: "bg-purple-500"
  },
  normal: {
    title: "Normal Skin",
    description: "Your skin is well-balanced, neither too oily nor too dry.",
    routine: ["Gentle Cleanser", "Basic Hydration Serum", "Daily Moisturizer", "Standard Sunscreen"],
    color: "bg-green-500"
  }
};

export const SkinGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent type
      const counts: { [key: string]: number } = {};
      newAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
      const skinType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResult(skinType);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <span className="bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
          Skin Analysis Tool
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">Discover Your Routine</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Answer a few questions to find the perfect dermatological products for your specific skin needs.
        </p>
      </div>

      <div className="bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-bold text-teal-600 uppercase">Question {currentStep + 1}/{QUESTIONS.length}</span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 w-8 rounded-full ${i <= currentStep ? 'bg-teal-500' : 'bg-gray-100'}`} />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
                {QUESTIONS[currentStep].text}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.type)}
                    className="p-6 text-left border-2 border-gray-50 rounded-2xl hover:border-teal-500 hover:bg-teal-50 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 group-hover:text-teal-700">{opt.text}</span>
                      <ChevronRight size={20} className="text-gray-300 group-hover:text-teal-500" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center"
            >
              <div className={`w-24 h-24 ${RESULTS[result].color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                <Sparkles size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter">You have {RESULTS[result].title}</h2>
              <p className="text-gray-600 mb-12 max-w-lg mx-auto leading-relaxed">
                {RESULTS[result].description} Based on this, we've curated a specialized routine for you.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Recommended Daily Routine</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RESULTS[result].routine.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </div>
                      <span className="font-bold text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
                  Shop Routine Items
                </button>
                <button onClick={reset} className="border-2 border-gray-200 px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-100">
        <div className="flex flex-col items-center text-center gap-4">
          <Droplets className="text-teal-500" size={32} />
          <h4 className="font-bold uppercase text-xs tracking-widest">hydration focus</h4>
          <p className="text-xs text-gray-500">All products dermatologically tested for moisture balance.</p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <Wind className="text-teal-500" size={32} />
          <h4 className="font-bold uppercase text-xs tracking-widest">airlight formulas</h4>
          <p className="text-xs text-gray-500">Fast absorbing, non-greasy textures suitable for BD climate.</p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <Sun className="text-teal-500" size={32} />
          <h4 className="font-bold uppercase text-xs tracking-widest">uv protection</h4>
          <p className="text-xs text-gray-500">Broad spectrum protection integrated into every routine.</p>
        </div>
      </div>
    </div>
  );
};

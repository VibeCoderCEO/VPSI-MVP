"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Navigation, Search, Filter, Star, Info, X, MapPin } from 'lucide-react';

export default function SafeEatsMap() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(true); // Paywall logic

  // Mock Data for the $10M Map
  const VENDORS = [
    { id: 1, name: "VPSI Premium Eats", lat: 5.6037, lng: -0.1870, status: 'green', score: 98, rating: 4.8 },
    { id: 2, name: "Market Side Grill", lat: 5.6120, lng: -0.1750, status: 'green', score: 95, rating: 4.2 },
    { id: 3, name: "The Yellow Gallon (Warning)", lat: 5.5900, lng: -0.1900, status: 'yellow', score: 62, rating: 3.1 }
  ];

  return (
    <div className="relative h-screen w-full bg-slate-100 overflow-hidden font-sans">
      
      {/* 1. SEARCH & FILTER HEADER */}
      <div className="absolute top-6 inset-x-6 z-30 flex gap-2">
        <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white flex items-center px-4 py-3">
          <Search className="text-slate-400 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="Search verified vendors..." 
            className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-sm"
          />
        </div>
        <button className="bg-purion-dark text-white p-4 rounded-2xl shadow-xl">
          <Filter size={20} />
        </button>
      </div>

      {/* 2. THE MAP VIEWPORT (Mocked for MVP) */}
      <div className="absolute inset-0 bg-slate-200">
        <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.1870,5.6037,13,0/600x600?access_token=YOUR_TOKEN')] bg-cover" />
        
        {/* VENDOR PINS */}
        {!isLocked && VENDORS.map((v) => (
          <motion.div
            key={v.id}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${40 + (v.id * 10)}%`, left: `${30 + (v.id * 15)}%` }}
            onClick={() => setSelectedVendor(v)}
          >
            <div className={`p-2 rounded-full border-2 border-white shadow-lg ${v.status === 'green' ? 'bg-purion-light' : 'bg-purion-accent'}`}>
              <ShieldCheck className="text-white" size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. PREMIUM PAYWALL BLUR */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 backdrop-blur-md bg-white/10 flex flex-col items-center justify-center p-10 text-center"
          >
            <div className="bg-white p-8 rounded-[40px] shadow-2xl max-w-sm border border-slate-100">
              <div className="w-20 h-20 bg-purion-dark rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Navigation className="text-purion-light animate-pulse" size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Safe-Eats Map Locked</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Connect to the VPSI Global Node to see real-time safety data for your area.
              </p>
              <button 
                onClick={() => window.location.href = '/premium'}
                className="w-full bg-purion-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-purion-primary/20 flex items-center justify-center gap-2"
              >
                UNLOCK FOR GHS 1.00
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. VENDOR PREVIEW CARD */}
      <AnimatePresence>
        {selectedVendor && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="absolute inset-x-6 bottom-24 z-50 bg-white rounded-3xl p-6 shadow-2xl flex gap-4 border border-slate-100"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
               <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{selectedVendor.name}</h3>
                <button onClick={() => setSelectedVendor(null)} className="text-slate-300"><X size={20} /></button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex items-center gap-1 text-xs font-bold text-purion-primary bg-green-50 px-2 py-1 rounded-lg">
                   <ShieldCheck size={14} /> {selectedVendor.score}% Safe
                 </div>
                 <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                   <Star size={14} className="fill-purion-accent text-purion-accent border-none" /> {selectedVendor.rating}
                 </div>
              </div>
              <button className="w-full bg-purion-dark text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
                 Route to Safety
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. NAVIGATION BAR */}
      <div className="absolute bottom-6 inset-x-6 z-50 bg-white rounded-3xl shadow-2xl p-4 flex justify-between px-8 border border-slate-100">
         <button onClick={() => window.location.href = '/feed'} className="text-slate-300 flex flex-col items-center gap-1">
            <ShieldCheck size={24} /><span className="text-[8px] font-black uppercase">Feed</span>
         </button>
         <button className="text-purion-primary flex flex-col items-center gap-1">
            <Navigation size={24} /><span className="text-[8px] font-black uppercase tracking-widest">Map</span>
         </button>
         <button onClick={() => window.location.href = '/scan'} className="text-slate-300 flex flex-col items-center gap-1">
            <div className="bg-purion-dark p-2 -mt-10 rounded-2xl shadow-xl shadow-purion-dark/40 border-4 border-white">
              <ShieldCheck className="text-purion-light" size={24} />
            </div>
            <span className="text-[8px] font-black uppercase mt-1">Scan</span>
         </button>
         <button className="text-slate-300 flex flex-col items-center gap-1">
            <Star size={24} /><span className="text-[8px] font-black uppercase">Scores</span>
         </button>
         <button className="text-slate-300 flex flex-col items-center gap-1">
            <MapPin size={24} /><span className="text-[8px] font-black uppercase">Profile</span>
         </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Store, Camera, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    businessName: '',
    location: ''
  });

  const getGPS = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({...formData, location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`});
        setTimeout(() => setLoading(false), 800);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6">
      <div className="max-w-md mx-auto mb-10">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-black uppercase text-purion-primary tracking-widest">Onboarding</span>
          <span className="text-[10px] font-black uppercase text-slate-400">Step {step} of 2</span>
        </div>
        <div className="h-1 bg-slate-100 w-full rounded-full overflow-hidden">
          <motion.div animate={{ width: step === 1 ? "50%" : "100%" }} className="h-full bg-purion-primary" />
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-3xl font-black mb-6 uppercase tracking-tighter">Identity</h1>
              <div className="space-y-4">
                <input 
                  placeholder="Full Name" 
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <input 
                  placeholder="Phone Number" 
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">NEXT</button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-black mb-6 uppercase tracking-tighter">Business</h1>
              <div className="space-y-4">
                <input 
                  placeholder="Business Name" 
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
                <div className="p-6 bg-slate-900 rounded-2xl text-white">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-2">GPS Verification</p>
                  <button onClick={getGPS} className="text-xs bg-purion-primary px-4 py-2 rounded-lg font-black">
                    {loading ? "LOCATING..." : formData.location ? "LOCKED" : "GET LOCATION"}
                  </button>
                </div>
                <button 
                   onClick={() => alert("Welcome to VPSI!")}
                   className="w-full bg-purion-primary text-white py-4 rounded-xl font-bold"
                >
                  FINISH
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

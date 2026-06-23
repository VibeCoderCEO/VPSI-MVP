"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Store, Camera, ArrowRight, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    category: 'Restaurant',
    location: '',
    phone: ''
  });

  // Simulated GPS Capture for Professionals
  const getGPS = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({...formData, location: `${position.coords.latitude}, ${position.coords.longitude}`});
        setLoading(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6">
      {/* 1. Progress Bar Section */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purion-primary">Account Setup</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {step} of 2</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "50%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            className="h-full bg-purion-primary"
          />
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="max-w-md mx-auto">
        {step === 1 ? (
          <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-black text-purion-dark mb-2 tracking-tight">Complete Your Profile</h1>
            <p className="text-slate-500 mb-8 text-sm">Tell us who you are to personalize your Purion experience.</p>
            
            <div className="space-y-6">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center text-slate-400 hover:border-purion-primary hover:text-purion-primary cursor-pointer transition-all">
                  <Camera size={24} />
                  <span className="text-[8px] font-bold mt-1 uppercase">Upload Photo</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Nathalie VPSI"
                  className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-purion-primary outline-none transition-all text-slate-900"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 text-slate-900">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+233..."
                  className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-purion-primary outline-none transition-all text-slate-900"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-purion-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-3xl font-black text-purion-dark mb-2 tracking-tight">Business Details</h1>
             <p className="text-slate-500 mb-8 text-sm">This information will be used for your Digital Safety Badge.</p>

             <div className="space-y-6 text-slate-900">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Entity Name</label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="Stall Name or Restaurant"
                      className="w-full p-4 pl-12 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-purion-primary outline-none text-slate-900"
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Entity Type</label>
                  <select 
                    className="w-full p-4 rounded-xl bg-slate-50 bord

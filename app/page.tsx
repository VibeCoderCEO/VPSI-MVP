"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Briefcase, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  // Logic States
  const [step, setStep] = useState<'role' | 'login' | 'success'>('role');
  const [role, setRole] = useState<'consumer' | 'professional' | null>(null);
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');

  // The Logic: Role Selection Card Component
  const RoleCard = ({ type, title, desc, icon: Icon }: any) => (
    <motion.div 
      whileHover={{ scale: 1.02, borderColor: '#1a8344' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => { setRole(type); setStep('login'); }}
      className="cursor-pointer bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm transition-all group relative overflow-hidden"
    >
      <div className="flex items-center justify-between relative z-10">
        <div className={`p-4 rounded-xl ${type === 'consumer' ? 'bg-green-50' : 'bg-emerald-50'}`}>
          <Icon className={type === 'consumer' ? 'text-purion-primary' : 'text-purion-dark'} size={32} />
        </div>
        <ChevronRight className="text-slate-300 group-hover:text-purion-primary transition-colors" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-slate-900 relative z-10">{title}</h3>
      <p className="text-slate-500 mt-2 text-sm leading-relaxed relative z-10">{desc}</p>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <Icon size={80} />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* 1. BRANDING SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="w-20 h-20 bg-purion-dark rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-b-4 border-purion-light">
           <ShieldCheck className="text-purion-light" size={45} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-purion-dark">PURION</h1>
        <p className="text-purion-primary font-bold tracking-[0.3em] text-[10px] mt-1 uppercase">Food Safety Made Visible</p>
      </motion.div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ROLE SELECTION SCREEN */}
          {step === 'role' && (
            <motion.div 
              key="role-screen"
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Welcome to VPSI Purion</h2>
                <p className="text-slate-500">Select your portal to begin</p>
              </div>
              <RoleCard 
                type="consumer"
                title="Consumer"
                desc="Access the 'Safe-Eats' map and check real-time vendor hygiene scores."
                icon={User}
              />
              <RoleCard 
                type="professional"
                title="Professional"
                desc="Vendors, Inspectors & Producers. Management & Audit dashboard."
                icon={Briefcase}
              />
            </motion.div>
          )}

          {/* STEP 2: LOGIN GATEWAY */}
          {step === 'login' && (
            <motion.div 
              key="login-screen"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
            >
              <button 
                onClick={() => setStep('role')} 
                className="text-xs font-bold text-purion-primary uppercase tracking-widest mb-6 flex items-center gap-1 hover:gap-2 transition-all"
              >
                ← Back to Roles
              </button>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {role === 'consumer' ? 'Sign In' : 'Professional Access'}
              </h2>
              <p className="text-slate-500 mb-8 text-sm">Use your VPSI-registered identity.</p>

              {/* Bolt-style Google Button */}
              <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all mb-6">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">Or Email OTP</span></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Verified Email</label>
                  <input 
                    type="email" 
                    placeholder="name@vpsi.com"
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-purion-primary focus:bg-white outline-none transition-all text-slate-900"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* THE PROFESSIONAL SECURITY GATE */}
                {role === 'professional' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Admin Access Key</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="password" 
                        placeholder="VPSI-XXXX-PRO"
                        className="w-full p-4 pl-12 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-purion-primary focus:bg-white outline-none transition-all text-slate-900"
                        onChange={(e) => setAccessKey(e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <button 
                onClick={() => setStep('success')}
                disabled={role === 'professional' && accessKey !== 'VPSI2026Pro'}
                className="w-full mt-8 bg-purion-dark text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-900 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-[0.98]"
              >
                {role === 'professional' ? 'Verify Credentials' : 'Get Access Code'}
              </button>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS ANIMATION */}
          {step === 'success' && (
            <motion.div 
              key="success-screen"
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white p-12 rounded-3xl shadow-xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-purion-primary" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Access Granted</h2>
              <p className="text-slate-500 mt-2">Welcome, Nathalie. Initializing Purion Safe-Eats Engine...</p>
              <div className="mt-8 flex justify-center">
                <div className="w-8 h-8 border-4 border-purion-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* FOOTER */}
      <p className="mt-12 text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">
        Secure Identity Management by VPSI-MVP
      </p>
    </div>
  );
}

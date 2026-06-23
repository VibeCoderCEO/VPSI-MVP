"use client";

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle2, CreditCard, ArrowLeft, Star, Navigation } from 'lucide-react';

export default function PremiumPage() {
  const [isPaid, setIsPaid] = useState(false);

  const config = {
    reference: "PURION-" + (new Date()).getTime().toString(),
    email: "ceo@vpsi.global",
    amount: 100, // 1 GHS
    publicKey: 'pk_test_your_actual_key_here',
    currency: 'GHS',
  };

  const onSuccess = (reference: any) => { setIsPaid(true); };
  const onClose = () => { console.log("Closed"); };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      <button onClick={() => window.history.back()} className="absolute top-8 left-6 text-slate-400 hover:text-purion-dark flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-purion-dark p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purion-light/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purion-light/30">
               <Zap className="text-purion-light" size={32} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Purion Pro</h1>
            <p className="text-purion-light/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2">The Global Safety Standard</p>
          </div>
          <ShieldCheck size={180} className="absolute -right-10 -top-10 text-white/5 rotate-12" />
        </div>

        <div className="p-8">
          <div className="space-y-5 mb-10">
            <div className="flex gap-4">
              <div className="bg-green-50 p-2 rounded-xl shrink-0"><Navigation className="text-purion-primary" size={20} /></div>
              <div><p className="text-sm font-black text-slate-900 uppercase tracking-tight">Safe-Eats GPS Map</p><p className="text-xs text-slate-500">Route to the cleanest vendors in a 5km radius.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-50 p-2 rounded-xl shrink-0"><Star className="text-purion-primary" size={20} /></div>
              <div><p className="text-sm font-black text-slate-900 uppercase tracking-tight">VPSI Priority Status</p><p className="text-xs text-slate-500">Your health reports are prioritized by inspectors.</p></div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 text-center mb-8">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Founder's Special</p>
             <div className="flex items-center justify-center gap-1">
                <span className="text-xl font-black text-slate-400 mt-2">GHS</span>
                <h2 className="text-5xl font-black text-purion-dark">1.00</h2>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {!isPaid ? (
              <motion.button 
                key="pay-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => initializePayment({onSuccess, onClose})}
                className="w-full bg-purion-primary text-white py-5 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 transition-all"
              >
                PAY WITH MOMO <CreditCard size={20} />
              </motion.button>
            ) : (
              <motion.div key="success-btn" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3">
                PRO UNLOCKED <CheckCircle2 size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )

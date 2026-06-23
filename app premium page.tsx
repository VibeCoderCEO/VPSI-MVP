"use client";

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle2, CreditCard, ArrowLeft, Star, Navigation } from 'lucide-react';

export default function PremiumPage() {
  const [isPaid, setIsPaid] = useState(false);

  // --- PAYSTACK CONFIG (THE CASHIER) ---
  const config = {
    reference: "PURION-" + (new Date()).getTime().toString(),
    email: "user@vpsi.global",
    amount: 100, // 100 Pesewas = 1 GHS
    publicKey: 'pk_test_your_actual_key_here', // You will replace this later
    currency: 'GHS',
  };

  const onSuccess = (reference: any) => {
    setIsPaid(true);
    // In a real app, we save this 'true' status to Supabase
  };

  const onClose = () => {
    console.log("Payment window closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      
      {/* 1. BACK BUTTON */}
      <button 
        onClick={() => window.history.back()}
        className="absolute top-8 left-6 text-slate-400 hover:text-purion-dark flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* 2. HEADER BLOCK */}
        <div className="bg-purion-dark p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purion-light/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purion-light/30">
               <Zap className="text-purion-light" size={32} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Purion Pro</h1>
            <p className="text-purion-light/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2">The Global Safety Standard</p>
          </div>
          {/* Decorative Shield */}
          <ShieldCheck size={180} className="absolute -right-10 -top-10 text-white/5 rotate-12" />
        </div>

        {/* 3. VALUE PROPOSITION */}
        <div className="p-8">
          <div className="space-y-5 mb-10">
            <div className="flex gap-4">
              <div className="bg-green-50 p-2 rounded-xl shrink-0"><Navigation className="text-purion-primary" size={20} /></div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Safe-Eats GPS Map</p>
                <p className="text-xs text-slate-500">Route to the cleanest vendors in a 5km radius.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-50 p-2 rounded-xl shrink-0"><Star className="text-purion-primary" size={20} /></div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">VPSI Priority Status</p>
                <p className="text-xs text-slate-500">Your health reports are prioritized by inspectors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-50 p-2 rounded-xl shrink-0"><CheckCircle2 className="text-purion-primary" size={20} /></div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Ad-Free Experience</p>
                <p className="text-xs text-slate-500">Zero interruptions in your safety journey.</p>
              </div>
            </div>
          </div>

          {/* 4. PRICING CARD */}
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 text-center mb-8">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Founder's Special</p>
             <div className="flex items-center justify-center gap-1">
                <span className="text-xl font-black text-slate-400 mt-2">GHS</span>
                <h2 className="text-5xl font-black text-purion-dark">1.00</h2>
             </div>
             <p className="text-[10px] font-bold text-purion-primary mt-2 uppercase tracking-tighter italic">One-time payment • Lifetime access</p>
          </div>

          {/* 5. PAYMENT BUTTON */}
          <AnimatePresence mode="wait">
            {!isPaid ? (
              <motion.button 
                key="pay-btn"
                whileHover

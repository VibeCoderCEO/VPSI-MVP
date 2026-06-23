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

  const onSuccess = (reference: any) => {
    setIsPaid(true);
  };

  const onClose = () => {
    console.log("Payment window closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      
      <button 
        onClick={() => window.history.back()}
        className="absolute top-8 left-6 text-slate-400 hover:text-purion-dark flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
      >
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
            <FeatureItem 
              icon={<Navigation className="text-purion-primary" size={20} />}
              title="Safe-Eats GPS Map"
              desc="Route to the cleanest vendors in a 5km radius."
            />
            <FeatureItem 
              icon={<Star className="text-purion-primary" size={20} />}
              title="VPSI Priority Status"
              desc="Your health reports are prioritized by inspectors."
            />
            <FeatureItem 
              icon={<CheckCircle2 className="text-purion-primary" size={20} />}
              title="Ad-Free Experience"
              desc="Zero interruptions in your safety journey."
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border-

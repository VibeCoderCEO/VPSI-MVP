"use client";

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Map, Zap, Star, CheckCircle2, Lock, CreditCard } from 'lucide-react';

export default function PremiumPage() {
  const [isPaid, setIsPaid] = useState(false);

  // --- PAYSTACK CONFIGURATION ---
  // You get this Public Key from your Paystack Dashboard (paystack.com)
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "ceo@vpsi.global",
    amount: 100, // This is in Pesewas (100 = 1 GHS)
    publicKey: 'pk_test_your_actual_key_here', // Replace with your Paystack key
    currency: 'GHS',
    metadata: {
      custom_fields: [
        {
          display_name: "Service",
          variable_name: "service",
          value: "Purion Pro Map Access"
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    // This runs when the MoMo transaction is successful
    setIsPaid(true);
    alert("Transaction Successful! Reference: " + reference.reference);
  };

  const onClose = () => {
    alert("Transaction cancelled. Pro features remain locked.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center font-sans">
      
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-purion-dark p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purion-light/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <Zap className="text-purion-light" size={32} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Purion Pro</h1>
            <p className="text-purion-light/60 text-[10px] font-bold uppercase tracking-[0.2em]">Unlock Global Safety Data</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldCheck size={120} className="text-white" />
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6 mb-10">
            <FeatureItem title="Safe-Eats 5km Radius Map" desc="The only real-time GPS map for verified vendors." />
            <FeatureItem title="Instant Health Sentinel Alerts" desc="Get notified if an outbreak is near you." />
            <FeatureItem title="Priority Support" desc="Direct line to VPSI Health Inspectors." />
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 text-center mb-8">
             <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Lifetime Access</p>
             <h2 className="text-4xl font-black text-purion-dark">GHS 1.00</h2>
          </div>

          {!isPaid ? (
            <button 
              onClick={() => initializePayment({onSuccess, onClose})}
              className="w-full bg-purion-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-purion-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              PAY WITH MOMO <CreditCard size={20} />
            </button>
          ) : (
            <motion.button 
              initial={{ scale: 0.5 }} animate={{ scale: 1 }}
              className="w-full bg-green-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl"
            >
              PRO FEATURES UNLOCKED <CheckCircle2 size={20} />
            </motion.button>
          )}

          <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Secured by Paystack & VPSI Global
          </p>
        </div>
      </div>

      <button onClick={() => window.history.back()} className="mt-8 text-slate-400 font-bold text-xs uppercase hover:text-purion-dark transition-colors">
        Skip for now
      </button>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-green-50 p-2 rounded-lg">
        <CheckCircle2 className="text-purion-primary" size={18} />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 leading-none mb-1">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

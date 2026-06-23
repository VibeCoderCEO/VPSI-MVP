"use client";

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle2, CreditCard, ArrowLeft } from 'lucide-react';

export default function PremiumPage() {
  const [isPaid, setIsPaid] = useState(false);

  const config = {
    reference: "PURION-" + (new Date()).getTime().toString(),
    email: "ceo@vpsi.global",
    amount: 100,
    publicKey: 'pk_test_your_key',
    currency: 'GHS',
  };

  const onSuccess = () => { setIsPaid(true); };
  const onClose = () => { console.log("closed"); };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6'>
      <div className='max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100'>
        <div className='bg-slate-900 p-10 text-center'>
          <Zap className='text-green-400 mx-auto mb-4' size={40} />
          <h1 className='text-3xl font-black text-white uppercase'>Purion Pro</h1>
        </div>
        <div className='p-8 text-center'>
          <p className='text-slate-500 mb-8'>Unlock the Safe-Eats Map and Global Safety Data.</p>
          <div className='bg-slate-50 p-6 rounded-3xl mb-8'>
            <h2 className='text-4xl font-black text-slate-900'>GHS 1.00</h2>
          </div>
          {isPaid ? (
            <div className='bg-green-500 text-white py-5 rounded-2xl font-black uppercase'>Access Granted</div>
          ) : (
            <button 
              onClick={() => initializePayment({onSuccess, onClose})}
              className='w-full bg-green-600 text-white py-5 rounded-2xl font-black shadow-xl uppercase'
            >
              Pay with MoMo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

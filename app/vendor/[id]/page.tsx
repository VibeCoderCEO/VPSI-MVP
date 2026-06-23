"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Clock, Star, Share2, 
  Settings, Camera, Plus, MessageSquare, 
  CheckCircle2, AlertTriangle, Info, ThumbsUp, Heart, Edit3, Lock
} from 'lucide-react';

export default function VendorProfile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'feed'>('overview');
  
  const [vendor, setVendor] = useState({
    name: "VPSI Premium Eats",
    description: "Authentic local cuisine prepared with the highest international safety standards. Certified organic sourcing.",
    status: "green" as "green" | "yellow" | "red",
    safetyScore: 98,
    rating: 4.8,
    totalReviews: 1240,
    address: "Independence Avenue, Accra",
    isOpen: true,
    openingTime: "08:00",
    closingTime: "22:00",
    banner: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    logo: "https://ui-avatars.com/api/?name=VPSI+Eats&background=1a8344&color=fff&size=128"
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      <div className="relative h-64 w-full overflow-hidden">
        <img src={vendor.banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-black/40" />
        <button 
          onClick={() => setIsAdmin(!isAdmin)} 
          className="absolute top-6 right-6 bg-purion-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl z-50"
        >
          {isAdmin ? "Switch to User View" : "Admin Login"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white shadow-xl bg-white">
               <img src={vendor.logo} className="w-full h-full object-cover" alt="Logo" />
            </div>
            <div className="text-center md:text-left flex-1">
               <h1 className="text-3xl font-black text-slate-900">{vendor.name}</h1>
               <p className="text-slate-400 font-bold text-sm flex items-center justify-center md:justify-start gap-2">
                 <MapPin size={14} /> {vendor.address}
               </p>
            </div>
            <div className="flex gap-2">
               <div className="text-center px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Safety</p>
                  <p className="text-xl font-black text-purion-primary">{vendor.safetyScore}%</p>
               </div>
               <div className="text-center px-4 border-l">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Rating</p>
                  <p className="text-xl font-black text-slate-900">{vendor.rating}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex gap-8 border-b border-slate-200 mb-8">
          {['overview', 'reviews', 'feed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-black uppercase tracking-widest ${activeTab === tab ? 'text-purion-primary border-b-4 border-purion-primary' : 'text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {isAdmin && (
              <div className="bg-purion-dark text-white p-8 rounded-[32px] shadow-2xl">
                <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Settings size={20} className="text-purion-light" /> Admin Control Panel
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white/10 p-4 rounded-xl font-bold uppercase text-xs flex items-center justify-center gap-2">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                  <button className="bg-purion-primary p-4 rounded-xl font-bold uppercase text-xs flex items-center justify-center gap-2">
                    <Plus size={16} /> New Post
                  </button>
                </div>
              </div>
            )}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="font-black uppercase text-slate-900 mb-4">About Vendor</h3>
               <p className="text-slate-600 leading-relaxed">{vendor.description}</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
             <div className="bg-orange-50 border border-orange-100 p-6 rounded-[24px]">
                <p className="text-sm font-black text-orange-900 uppercase">Safety First Policy</p>
                <p className="text-xs text-orange-700 mt-1">Consumer reviews cannot be hidden or altered by vendors.</p>
             </div>
             {[1, 2, 3].map((r) => (
                <div key={r} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full" />
                      <div>
                         <p className="font-black text-sm">Verified_User_{r}</p>
                         <p className="text-[10px] font-bold text-purion-primary uppercase tracking-tighter">Verified Purion Eat</p>
                      </div>
                   </div>
                   <p className="text-slate-600 text-sm">The cleanliness standards here are exactly what Purion promised. I feel safe eating here!</p>
                </div>
             ))}
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square bg-slate-200 rounded-2xl overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&sig=${i}`} className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Clock, Star, Share2, 
  Settings, Camera, Plus, MessageSquare, 
  CheckCircle2, AlertTriangle, Info, ExternalLink,
  ThumbsUp, Heart, MoreVertical, Edit3, Lock
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  healthReported: boolean;
}

interface Post {
  id: string;
  image: string;
  caption: string;
  likes: number;
  date: string;
}

export default function VendorProfile({ params }: { params: { id: string } }) {
  // --- STATE MANAGEMENT ---
  const [isAdmin, setIsAdmin] = useState(false); // Toggle this to see Admin vs Consumer view
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'feed'>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Vendor Data (In $10M app, this comes from Supabase)
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
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* PART 1: THE PREMIUM HEADER */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={vendor.banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Admin Edit Banner Button */}
        {isAdmin && (
          <button className="absolute top-6 right-24 bg-white/20 backdrop-blur-md text-white p-3 rounded-xl border border-white/30 hover:bg-white/40 transition-all">
            <Camera size={20} />
          </button>
        )}

        <button onClick={() => setIsAdmin(!isAdmin)} className="absolute top-6 right-6 bg-purion-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
          {isAdmin ? "Switch to User View" : "Admin Login"}
        </button>
      </div>

      {/* VENDOR IDENTITY CARD */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              <div className="relative">
                <div className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white shadow-xl bg-white">
                  <img src={vendor.logo} className="w-full h-full object-cover" alt="Logo" />
                </div>
                <div className={`absolute -bottom-2 -right-2 p-2 rounded-full border-4 border-white shadow-lg ${vendor.status === 'green' ? 'bg-purion-light' : 'bg-purion-accent'}`}>
                  <ShieldCheck className="text-white" size={24} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{vendor.name}</h1>
                  <CheckCircle2 className="text-blue-500" size={20} />
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500">
                  <span className="flex items-center gap-1 text-sm font-bold">
                    <MapPin size={16} className="text-purion-primary" /> {vendor.address}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-bold">
                    <Clock size={16} className="text-purion-primary" /> {vendor.openingTime} - {vendor.closingTime}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${vendor.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {vendor.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button className="p-4 bg-slate-50 t

              {/* TABS NAVIGATION */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex gap-8 border-b border-slate-200 mb-8">
          {['overview', 'reviews', 'feed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-purion-primary' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 inset-x-0 h-1 bg-purion-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* REVIEWS SECTION */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Feedback</h3>
                  <button className="bg-purion-primary/10 text-purion-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-purion-primary hover:text-white transition-all">
                    Write a Review
                  </button>
                </div>

                {/* THE "SENTINEL" ALERT - Immutable logic */}
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex gap-3 items-start">
                  <Info className="text-orange-500 shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-bold text-orange-900 uppercase tracking-tight">Safety Alert System</p>
                    <p className="text-xs text-orange-700 leading-relaxed mt-1">
                      Ratings are crowdsourced and verified via VPSI protocols. Vendors cannot delete or hide negative safety reports. 
                      Transparency is guaranteed.
                    </p>
                  </div>
                </div>

                {[1, 2, 3].map((r) => (
                  <div key={r} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${r}`} alt="User" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">User_{r}99</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                            <Star size={10} className="fill-purion-accent text-purion-accent" />
                            5.0 • 2 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-purion-primary bg-green-50 px-2 py-1 rounded-lg uppercase">
                        <ShieldCheck size={12} /> Verified Eat
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The hygiene here is outstanding. I saw the staff using fresh gloves and the temp checks on the display were consistent. Highly recommend for safety-conscious eaters!
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purion-primary">
                        <ThumbsUp size={14} /> Helpful
                      </button>
                      <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purion-danger">
                        <AlertTriangle size={14} /> Report
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* OVERVIEW SECTION - SHOWING ADMIN CONTROLS */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {isAdmin && (
                  <div className="bg-purion-dark text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                          <Settings size={20} className="text-purion-light" /> Vendor Dashboard
                        </h3>
                        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl">
                          <button 
                            onClick={() => setVendor({...vendor, isOpen: true})}
                            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${vendor.isOpen ? 'bg-purion-primary' : 'hover:bg-white/5'}`}
                          >Open</button>
                          <button 
                            onClick={() => setVendor({...vendor, isOpen: false})}
                            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${!vendor.isOpen ? 'bg-purion-danger' : 'hover:bg-white/5'}`}
                          >Closed</button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Edit Hours</p>
                          <div className="flex items-center gap-2">
                            <input type="time" defaultValue={vendor.openingTime} className="bg-transparent font-bold outline-none border-b border-white/20" />
                            <span className="text-slate-500">to</span>
                            <input type="time" defaultValue={vendor.closingTime} className="bg-transparent font-bold outline-none border-b border-white/20" />
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Profile Actions</p>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-white/10 hover:bg-white/20 p-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                              <Edit3 size={12} /> Edit Info
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 p-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 text-purion-danger">
                              <Lock size={12} /> Security
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-purion-primary/20 rounded-2xl border border-purion-primary/30 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">New Post</p>
                          <p className="text-[10px] text-purion-light font-bold uppercase">Update your customers today</p>
                        </div>
                        <button className="bg-white text-purion-dark p-3 rounded-full shadow-lg">
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-[-20px] top-[-20px] opacity-10">
                      <ShieldCheck size={200} />
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">About this Vendor</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {vendor.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="h-48 rounded-3xl bg-slate-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                   </div>
                   <div className="h-48 rounded-3xl bg-slate-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative group cursor-pointer">
                    <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&sig=${i}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
                       <span className="flex items-center gap-1"><Heart size={18} fill="white" /> 24</span>
                       <span className="flex items-center gap-1"><MessageSquare size={18} fill="white" /> 5</span>
                    </div>
                  </div>
                ))}
                {isAdmin && (
                  <div className="aspect-square rounded-2xl border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-purion-primary hover:text-purion-primary transition-all">
                    <Plus size={32} />
                    <span className="text-[10px] font-black uppercase mt-2">New Post</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* SIDEBAR - INFO & VERIFICATION */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Inspection History</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purion-light rounded-full shadow-[0_0_8px_#22c55e]" />
                  <p className="text-sm font-bold text-slate-700">Audit Passed - Oct 2024</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purion-light rounded-full" />
                  <p className="text-sm font-bold text-slate-700">Audit Passed - Sept 2024</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purion-accent rounded-full" />
                  <p className="text-sm font-bold text-slate-700 italic">Minor Infraction - Aug 2024</p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">
                Download PDF Report
              </button>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xs font-black text-purion-light uppercase tracking-widest mb-4">VPSI Health Sentinel</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This vendor is monitored in real-time. If you feel unwell after eating here, use the Anonymous Health Sentinel button.
                </p>
                <button className="w-full bg-purion-danger text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purion-danger/20 flex items-center justify-center gap-2">
                  <AlertTriangle size={16} /> I feel unwell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

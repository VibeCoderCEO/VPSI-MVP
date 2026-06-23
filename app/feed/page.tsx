"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, ShieldCheck, 
  MoreHorizontal, PlusSquare, Search, Bell,
  CheckCircle, MapPin, Award
} from 'lucide-react';

// Pro Mock Data for the MVP
const INITIAL_POSTS = [
  {
    id: 1,
    vendorName: "Kojo's Organic Kitchen",
    status: "green",
    location: "Greater Accra, Ghana",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    caption: "Fresh delivery of organic vegetables today! All prep surfaces sanitized at 8:00 AM. #CleanEats #PurionVerified",
    likes: 124,
    comments: 12,
    verified: true,
    time: "2h ago"
  },
  {
    id: 2,
    vendorName: "City Center Grill",
    status: "yellow",
    location: "Kumasi",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    caption: "New water filtration system installed! Waiting for inspector validation to move back to Green status. 🚰",
    likes: 89,
    comments: 45,
    verified: true,
    time: "5h ago"
  }
];

export default function FeedPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. STICKY PRO NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purion-dark p-1.5 rounded-lg">
            <ShieldCheck className="text-purion-light" size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter text-purion-dark">PURION</span>
        </div>
        <div className="flex items-center gap-5 text-slate-600">
          <Search size={22} className="cursor-pointer hover:text-purion-primary" />
          <div className="relative">
             <Bell size={22} className="cursor-pointer hover:text-purion-primary" />
             <span className="absolute -top-1 -right-1 bg-purion-danger w-2 h-2 rounded-full border-2 border-white"></span>
          </div>
          <PlusSquare size={22} className="text-purion-primary cursor-pointer" />
        </div>
      </nav>

      <div className="max-w-xl mx-auto pt-6 space-y-6">
        
        {/* 2. PRO-VENDORS "STORIES" (Academy Graduates) */}
        <div className="px-4 overflow-x-auto no-scrollbar flex gap-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
              <div className="w-16 h-16 rounded-full border-2 border-purion-primary p-0.5">
                <div className="w-full h-full bg-slate-200 rounded-full border-2 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Vendor {i}</span>
            </div>
          ))}
        </div>

        {/* 3. THE FEED ENGINE */}
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border border-slate-100">
                       <img src={`https://ui-avatars.com/api/?name=${post.vendorName}&background=random`} alt="" />
                    </div>
                    {/* Role Indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center
                      ${post.status === 'green' ? 'bg-purion-light' : 'bg-purion-accent'}`}>
                      <CheckCircle size={8} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm text-slate-900">{post.vendorName}</h4>
                      {post.verified && <Award size={14} className="text-blue-500 fill-blue-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <MapPin size={10} />
                      <span className="text-[10px] font-medium uppercase tracking-tight">{post.location}</span>
                    </div>
                  </div>
                </div>
                <MoreHorizontal size={18} className="text-slate-400 cursor-pointer" />
              </div>

              {/* Visual Content */}
              <div className="relative aspect-square bg-slate-100">
                <img 
                  src={post.imageUrl} 
                  alt="Post content" 
                  className="w-full h-full object-cover"
                />
                {/* Safety Badge Overlay */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border
                  ${post.status === 'green' ? 'bg-green-500/20 text-green-100 border-green-400/30' : 'bg-yellow-500/20 text-yellow-100 border-yellow-400/30'}`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${post.status === 'green' ? 'bg-purion-light' : 'bg-purion-accent'}`} />
                  {post.status} Safety Rating

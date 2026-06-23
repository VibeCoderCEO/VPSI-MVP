"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, ShieldCheck, 
  MoreHorizontal, PlusSquare, Search, Bell,
  CheckCircle, MapPin, Award, User
} from 'lucide-react';

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
  const [posts] = useState(INITIAL_POSTS);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purion-dark p-1.5 rounded-lg">
            <ShieldCheck className="text-purion-light" size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter text-purion-dark uppercase">PURION</span>
        </div>
        <div className="flex items-center gap-5 text-slate-600">
          <Search size={22} className="cursor-pointer hover:text-purion-primary" />
          <Bell size={22} className="cursor-pointer hover:text-purion-primary" />
          <PlusSquare size={22} className="text-purion-primary cursor-pointer" />
        </div>
      </nav>

      <div className="max-w-xl mx-auto pt-6 space-y-6">
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-900">
                   <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold">
                     {post.vendorName[0]}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{post.vendorName}</h4>
                      <p className="text-[10px] text-slate-400 uppercase">{post.location}</p>
                   </div>
                </div>
                <MoreHorizontal size={18} className="text-slate-400" />
              </div>
              <img src={post.imageUrl} className="w-full aspect-square object-cover" alt="Post" />
              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  <Heart size={24} className="text-slate-400" />
                  <MessageCircle size={24} className="text-slate-400" />
                  <Share2 size={24} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-bold mr-2 text-slate-900">{post.vendorName}</span>
                  {post.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

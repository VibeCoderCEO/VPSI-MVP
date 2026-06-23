"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, X, Zap, Camera, RefreshCw, 
  AlertTriangle, CheckCircle2, Info, Navigation, History
} from 'lucide-react';

export default function ScanPage() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [torchOn, setTorchOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendorDetails, setVendorDetails] = useState<any>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // LOGIC: Initialize High-Speed Scanner
  useEffect(() => {
    const config = { 
      fps: 20, 
      qrbox: { width: 280, height: 280 },
      aspectRatio: 1.0 
    };

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(err => console.error(err));
      }
    };
  }, []);

  const startScanner = () => {
    if (!scannerRef.current) return;

    scannerRef.current.start(
      { facingMode: "environment" },
      { fps: 20, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        handleSuccess(decodedText);
      },
      (errorMessage) => {
        // We don't alert errors here to keep the UX clean
      }
    ).catch(err => {
      setError("Camera access denied. Please enable camera in settings.");
    });
  };

  const handleSuccess = async (decodedText: string) => {
    setIsScanning(false);
    setScannedData(decodedText);
    
    // Simulate API lookup for Vendor Safety Data
    // In a real $10M app, this hits your Supabase database
    setVendorDetails({
      name: "Mama Grace Street Food",
      id: decodedText,
      status: "green",
      lastInspected: "Oct 24, 2024",
      score: 98,
      trustLevel: "High",
      location: "Makola Market, Zone A"
    });

    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setVendorDetails(null);
    setIsScanning(true);
    startScanner();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* 1. TOP OVERLAY - BRANDING */}
      <div className="absolute top-0 inset-x-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="bg-purion-primary p-2 rounded-xl shadow-lg shadow-purion-primary/20">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter">PURION SCAN</h1>
            <p className="text-[8px] text-purion-light font-bold uppercase tracking-[0.2em]">Safety Verification Engine</p>
          </div>
        </div>
        <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
          <X size={20} onClick={() => window.history.back()} />
        </button>
      </div>

      {/* 2. THE LIVE VIEWFINDER */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <div id="reader" className="w-full h-full object-cover"></div>
        
        {/* Visual Scanning Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              {/* Corner Brackets */}
              <div className="relative w-[280px] h-[280px]">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-purion-light rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-purion-light rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-purion-light rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-purion-light rounded-br-3xl"></div>
                
                {/* The Scanning Laser Line */}
                <motion.div 
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-purion-light to-transparent shadow-[0_0_15px_#22c55e] z-20"
                />
              </div>

              {/* Instructions Overlay */}
              <div className="absolute bottom-32 text-center w-full px-10">
                <p className="text-sm font-medium text-white/80 animate-pulse">
                  Align Purion QR code within the frame
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. CAMERA CONTROLS */}
      <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center items-center gap-8 px-10">
        <button className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white/60">
          <History size={24} />
        </button>
        <button className="w-20 h-20 bg-purion-primary rounded-full flex items-center justify-center border-8 border-white/10 shadow-2xl shadow-purion-primary/40">
          <Camera size={32} className="text-white" />
        </button>
        <button 
          onClick={() => setTorchOn(!torchOn)}
          className={`p-4 rounded-2xl border transition-all ${torchOn ? 'bg-purion-accent border-purion-accent text-purion-dark' : 'bg-white/10 border-white/20 text-white/60'}`}
        >
          <Zap size={24} fill={torchOn ? "currentColor" : "none"} />
        </button>
      </div>

      {/* 4. SUCCESS BOTTOM SHEET */}
      <AnimatePresence>
        {vendorDetails && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="absolute inset-x-0 bottom-0 z-[60] bg-white rounded-t-[40px] p-8 text-slate-900"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-black">{vendorDetails.name}</h2>
                  <CheckCircle2 className="text-blue-500" size={20} />
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <MapPin size={12} />
                  {vendorDetails.location}
                </div>
              </div>
              <div className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-tighter border-2 ${vendorDetails.status === 'green' ? 'bg-green-50 border-purion-light text-purion-primary' : 'bg-red-50 border-purion-danger text-purion-danger'}`}>
                {vendorDetails.status} STATUS
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Safety Score</p>
                <p className="text-2xl font-black text-purion-dark">{vendorDetails.score}%</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Trust Level</p>
                <p className="text-2xl font-black text-purion-dark">{vendorDetails.trustLevel}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-purion-dark text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl">
                VIEW FULL SAFETY REPORT <Navigation size={20} />
              </button>
              <button 
                onClick={resetScanner}
                className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold"
              >
                Scan Another Vendor
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              <Info size={12} />
              Verified by VPSI Health Protocol 2024
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-10 text-center">
          <AlertTriangle size={60} className="text-purion-accent mb-6" />
          <h2 className="text-2xl font-bold mb-2">Camera Access Required</h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-white text-black px-8 py-3 rounded-xl font-bold">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

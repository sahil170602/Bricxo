"use client";

import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { 
  Printer, 
  Building2, 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone 
} from "lucide-react";

// Note: In a real app, you would fetch this data in a Server Component 
// or via an API route. For this update, we are assuming the order data 
// is passed or fetched based on the ID.
export default function ReceiptAndTrackingPage({ params }: { params: any }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulated Steps logic
  const steps = [
    { label: 'Ordered', icon: <Package size={18} />, active: true },
    { label: 'Processing', icon: <Clock size={18} />, active: true },
    { label: 'Shipping', icon: <Truck size={18} />, active: true },
    { label: 'Delivered', icon: <CheckCircle2 size={18} />, active: false },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <BackButton />
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-black transition"
          >
            <Printer size={18} /> Print Invoice
          </button>
        </div>

        {/* --- 1. LIVE TRACKING SECTION (Visual Simulation) --- */}
        <div className="print:hidden mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Track Materials</h2>
          
          {/* Mock Map Interface */}
          [Image of a logistics delivery tracking progress bar and map interface]
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative h-64 mb-6">
            {/* Styled Map Background */}
            <div className="absolute inset-0 bg-[#f0ede5] opacity-50 bg-[url('https://www.google.com/maps/d/u/0/thumbnail?mid=1_fT-f1I9I_S_vWd7f7m_V7O5yE')] bg-cover grayscale" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                  {/* Origin (Store) */}
                  <div className="absolute top-1/4 left-1/4 bg-gray-900 p-2 rounded-full text-white shadow-lg">
                      <Package size={16} />
                  </div>
                  {/* Animated Truck */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                      <div className="bg-[#FF8237] p-3 rounded-full text-white shadow-2xl border-4 border-white">
                          <Truck size={24} />
                      </div>
                  </div>
                  {/* Destination (User Site) */}
                  <div className="absolute bottom-1/4 right-1/4 bg-green-600 p-2 rounded-full text-white shadow-lg">
                      <MapPin size={16} />
                  </div>
              </div>
            </div>
            
            {/* ETA Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white flex items-center justify-between shadow-lg">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Arrival</p>
                  <p className="font-black text-gray-900 text-lg">45 - 60 Mins</p>
              </div>
              <a href="tel:9100000000" className="bg-gray-900 text-white p-3 rounded-xl hover:scale-95 transition-transform">
                  <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="relative flex justify-between">
                  {/* Connector Lines */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-100 -z-0" />
                  <div className="absolute top-5 left-0 w-2/3 h-1 bg-[#FF8237] -z-0" />

                  {steps.map((step, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-2 ${step.active ? 'bg-[#FF8237] border-[#FF8237] text-white' : 'bg-white border-gray-100 text-gray-300'}`}>
                              {step.icon}
                          </div>
                          <span className={`text-[10px] font-black uppercase ${step.active ? 'text-gray-900' : 'text-gray-300'}`}>
                              {step.label}
                          </span>
                      </div>
                  ))}
              </div>
          </div>
        </div>

        {/* --- 2. INVOICE SECTION (Printable) --- */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12 print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#FF8237] mb-2">
                <Building2 size={32} />
                <span className="text-2xl font-black tracking-tighter text-gray-900">BRICXO</span>
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Premium Construction Materials</p>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-black text-gray-900 uppercase">Invoice</h1>
              <p className="text-gray-400 font-mono text-sm">#ORDER_ID_HERE</p>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-2 gap-8 mb-12 text-sm">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Billed To</p>
              <p className="font-bold text-gray-900 leading-relaxed whitespace-pre-line">
                Sample Customer Name<br/>
                123 Construction Site Road<br/>
                Bangalore, 560001<br/>
                Phone: +91 98765 43210
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Date Issued</p>
              <p className="font-bold text-gray-900">December 24, 2025</p>
              
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4 mb-2">Payment Method</p>
              <p className="font-bold text-gray-900 capitalize text-sm">Cash on Delivery</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-12">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="py-4">Material Description</th>
                  <th className="py-4 text-center">Qty</th>
                  <th className="py-4 text-right">Unit Price</th>
                  <th className="py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4">
                      <p className="font-bold text-gray-900">UltraTech Cement</p>
                      <p className="text-xs text-gray-400">per Bag</p>
                    </td>
                    <td className="py-4 text-center font-bold text-gray-900">50</td>
                    <td className="py-4 text-right font-bold text-gray-900">₹450</td>
                    <td className="py-4 text-right font-black text-gray-900">₹22,500</td>
                  </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-8 border-t border-gray-100">
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Subtotal</span>
                <span>₹22,500</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold">
                <span>GST (18%)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-900">
                <span className="text-lg font-black text-gray-900 uppercase">Grand Total</span>
                <span className="text-2xl font-black text-[#FF8237]">₹22,500</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 text-center border-t border-gray-50 pt-8">
            <p className="text-sm font-bold text-gray-900 mb-1">Thank you for building with BRICXO!</p>
            <p className="text-[10px] text-gray-400 font-medium">This is a computer-generated invoice and does not require a signature.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
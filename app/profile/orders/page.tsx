"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { getCustomerOrders } from '@/app/actions';
import { Package, Clock, CheckCircle2, Search, ArrowRight, ReceiptText, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrderHistoryPage() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    const data = await getCustomerOrders(phone);
    setOrders(data);
    setLoading(false);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        <div className="mt-8 mb-12 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">Order History</h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Track your material deliveries and view receipts</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="bg-white p-2 rounded-2xl shadow-xl flex gap-2 border border-gray-100">
            <input 
              type="tel" 
              placeholder="Enter Registered Phone Number" 
              className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-gray-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button className="bg-[#FF8237] text-white p-3 rounded-xl hover:bg-[#E56A1F] transition-all active:scale-95 shadow-lg shadow-orange-200">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-[#FF8237] border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Fetching your records...</p>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 transition-all hover:shadow-md">
                
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reference ID</span>
                      <h3 className="font-mono font-bold text-gray-900 text-lg">#{order.id.slice(-8).toUpperCase()}</h3>
                      <p className="text-xs text-gray-400 mt-1 font-bold uppercase">
                        Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </p>
                    </div>

                    {/* ✅ VIEW RECEIPT / TRACK BUTTON */}
                    <Link 
                      href={`/profile/orders/${order.id}`}
                      className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border border-gray-900 shadow-lg shadow-gray-200"
                    >
                      <Truck size={14} className="text-[#FF8237]" />
                      Track Order <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Material List & Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                   <div className="space-y-4 flex-1">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                            {item.product.image.startsWith('http') ? '📦' : item.product.image}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{item.product.name}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {item.quantity} {item.product.unit} × ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="md:w-32 text-right bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Live Status</span>
                    <div className={`flex items-center justify-end gap-1 font-black text-[11px] uppercase ${order.status === 'Delivered' ? 'text-green-600' : 'text-[#FF8237]'}`}>
                      {order.status === 'Delivered' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Footer Total */}
                <div className="bg-gray-900 p-4 rounded-2xl flex justify-between items-center shadow-inner">
                  <span className="font-black text-xs uppercase tracking-widest text-gray-400">Grand Total Paid</span>
                  <span className="text-xl font-black text-white">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : hasSearched && (
            <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-300">
              <Package className="mx-auto text-gray-200 mb-4" size={64} />
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">No orders found</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Check the phone number and try again.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
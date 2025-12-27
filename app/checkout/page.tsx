"use client";

import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { MapPin, CreditCard, Truck, CheckCircle, Wallet, ArrowRight, Loader2 } from 'lucide-react';
// ✅ IMPORT FIXED (Works after you rename action.ts -> actions.ts)
import { createOrder } from '../actions'; 

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({ fullName: "", phone: "", pincode: "", address: "" });

  const delivery = cartTotal > 10000 ? 0 : 500;
  const grandTotal = cartTotal + delivery;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createOrder(cart, { ...formData, paymentMethod }, grandTotal);

    if (result.success && result.orderId) {
      setOrderId(result.orderId);
      clearCart();
      setIsSuccess(true);
    } else {
      alert("Order failed! Please try again.");
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#E7E3D2]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"><CheckCircle className="text-green-600 w-12 h-12" /></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-8 max-w-md">Thank you for ordering with BRICXO.</p>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 w-full max-w-sm">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Order ID</p>
            <p className="text-xl font-mono font-bold text-gray-900">#{orderId.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={() => window.location.href = '/'} className="bg-[#FF8237] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#E56A1F] transition">Return to Home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-lg"><MapPin className="text-[#FF8237]" size={24} /></div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label><input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone</label><input type="tel" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none" required onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pincode</label><input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none" required onChange={(e) => setFormData({...formData, pincode: e.target.value})} /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Address</label><textarea className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none resize-none" rows={3} required onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea></div>
              </div>
              <div className="flex items-center gap-3 mb-6 pt-6 border-t border-gray-100">
                <div className="bg-orange-100 p-2 rounded-lg"><Wallet className="text-[#FF8237]" size={24} /></div>
                <h2 className="text-xl font-bold text-gray-900">Payment</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-[#FF8237] bg-orange-50' : 'border-gray-200'}`}><Truck className={paymentMethod === 'cod' ? 'text-[#FF8237]' : 'text-gray-400'} /><p className="font-bold text-gray-900">Cash on Delivery</p></div>
                <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 ${paymentMethod === 'online' ? 'border-[#FF8237] bg-orange-50' : 'border-gray-200'}`}><CreditCard className={paymentMethod === 'online' ? 'text-[#FF8237]' : 'text-gray-400'} /><p className="font-bold text-gray-900">UPI / Card</p></div>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="text-green-600">{delivery === 0 ? 'Free' : `₹${delivery}`}</span></div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
              </div>
              <button form="checkout-form" type="submit" disabled={isLoading} className="w-full bg-[#FF8237] hover:bg-[#E56A1F] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-70">{isLoading ? <Loader2 className="animate-spin" /> : <>Place Order <ArrowRight size={20} /></>}</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const deliveryCharge = cartTotal > 10000 ? 0 : 500;
  const total = cartTotal + deliveryCharge;

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <Link href="/" className="bg-[#FF8237] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#E56A1F] transition">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 border-b border-gray-100 flex items-center gap-6 last:border-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-3xl select-none">
                       {item.image.startsWith('http') || item.image.startsWith('/') ? '📷' : item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm">₹{item.price} / {item.unit}</p>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-50 text-gray-500"><Minus size={16} /></button>
                      <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-50 text-gray-500"><Plus size={16} /></button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-96">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Delivery</span><span className={deliveryCharge === 0 ? 'text-green-600' : ''}>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span></div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                </div>
                <Link href="/checkout" className="w-full block">
                  <button className="w-full bg-[#FF8237] hover:bg-[#E56A1F] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95">Proceed to Checkout <ArrowRight size={20} /></button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
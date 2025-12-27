"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function FloatingCart() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-in slide-in-from-bottom-10">
      <Link href="/cart">
        <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF8237] p-2 rounded-lg relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">View Cart</p>
              <p className="font-bold text-sm">₹{cartTotal.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#FF8237]">
            Checkout <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </div>
  );
}
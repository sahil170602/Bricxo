export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Phone, Star } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import AddToCartButton from "@/components/AddToCartButton";
import MaterialCalculator from "@/components/MaterialCalculator";
import FloatingCart from "@/components/FloatingCart";

const prisma = new PrismaClient();

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 8, 
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });
  return products;
}

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function Home() {
  const products = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-start">
          <span className="bg-[#FF8237] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-orange-900/40">
            Factory Direct Prices
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            Build Better <br/> With <span className="text-[#FF8237]">BRICXO.</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-medium drop-shadow-md">
            Order premium construction materials directly from the factory to your site.
          </p>
          <div className="flex gap-4">
            <Link href="/search" className="bg-[#FF8237] hover:bg-[#E56A1F] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
              Shop Materials <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 2. FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF8237] transition-colors">
              <Truck className="text-[#FF8237] group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-500">24-48 hour delivery to your construction site.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group">
             <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF8237] transition-colors">
              <ShieldCheck className="text-[#FF8237] group-hover:text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-500">100% genuine products directly from top brands.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group">
             <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF8237] transition-colors">
              <Phone className="text-[#FF8237] group-hover:text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-500">Civil engineers available for quantity estimation help.</p>
          </div>
        </div>

        {/* 3. CALCULATOR & CATEGORIES SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                 <Link key={cat.id} href={`/search?q=${cat.name}`} className="group block">
                  <div className="bg-white aspect-[4/3] rounded-2xl border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF8237] hover:shadow-lg transition-all cursor-pointer">
                    <span className="text-5xl mb-3">
{(cat.image || '').startsWith('http') ? '📦' : (cat.image || '📦')}                    </span>
                    <span className="text-sm font-bold text-gray-700 uppercase">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-96">
             <MaterialCalculator />
          </div>
        </div>

        {/* 4. TRENDING PRODUCTS */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
             <div key={product.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
               <Link href={`/product/${product.id}`} className="group block mb-4">
                 <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                    {product.image.startsWith('http') ? '📦' : product.image}
                 </div>
                 <div className="mt-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-400">{product.rating}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 leading-tight text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded w-fit mt-2">
                      {product.unit}
                    </p>
                 </div>
               </Link>
               <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <p className="text-xl font-black text-gray-900">₹{product.price}</p>
                  {/* Event handler moved into the Client Component prop */}
                  <AddToCartButton 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      unit: product.unit
                    }} 
                  />
               </div>
             </div>
          ))}
        </div>
      </div>
      <FloatingCart />
    </main>
  );
}
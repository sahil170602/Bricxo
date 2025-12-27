import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import AddToCartButton from '@/components/AddToCartButton';
import { PrismaClient } from '@prisma/client';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

// Fetch Product Data with Category
async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { category: true },
  });
  return product;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  // Handle case where product doesn't exist
  if (!product) {
    return notFound();
  }

  // Calculate discount percentage if original price exists
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Dynamic Back Button */}
        <BackButton />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-6">
          <div className="flex flex-col md:flex-row">
            
            {/* LEFT: Image Section */}
            <div className="w-full md:w-1/2 bg-gray-50 p-10 flex items-center justify-center relative min-h-[400px]">
               <button className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors z-10 cursor-pointer text-gray-400">
                 <Heart size={20} />
               </button>
               
               <div className="relative w-full aspect-square flex items-center justify-center text-9xl select-none animate-in fade-in zoom-in duration-500">
                 {/* Logic to handle Emoji vs Image URL */}
                 {product.image.startsWith('http') || product.image.startsWith('/') ? (
                    <span className="text-9xl">📷</span> // Fallback if image URL loads
                 ) : (
                    product.image // Display Emoji directly
                 )}
               </div>
            </div>

            {/* RIGHT: Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="mb-4">
                {product.inStock ? (
                   <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     In Stock
                   </span>
                ) : (
                   <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     Out of Stock
                   </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm font-medium">({product.rating} rating)</span>
              </div>

              {/* Price Block */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                      <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-sm">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-2 text-sm font-medium">Inclusive of all taxes. Unit: per {product.unit}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Quantity Selector (Visual only for server component, functionality handled in Cart) */}
                <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 w-full sm:w-32">
                  <span className="text-xl font-bold text-gray-400 cursor-not-allowed">-</span>
                  <span className="font-bold text-lg text-gray-900">1</span>
                  <span className="text-xl font-bold text-gray-400 cursor-not-allowed">+</span>
                </div>
                
                {/* Add To Cart Button */}
                <div className="w-full">
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

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Truck className="text-[#FF8237]" size={24} />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Fast Delivery</h4>
                    <p className="text-xs text-gray-500">Within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <ShieldCheck className="text-[#FF8237]" size={24} />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Quality Assured</h4>
                    <p className="text-xs text-gray-500">Lab tested products</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
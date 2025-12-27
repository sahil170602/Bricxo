import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import BackButton from '@/components/BackButton'; // ✅ Import this
import { Filter, AlertCircle } from 'lucide-react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCategoryData(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: slug },
    include: { products: true },
  });
  return category;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const categoryData = await getCategoryData(slug);

  if (!categoryData) {
    return (
      <main className="min-h-screen bg-[#E7E3D2]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Category Not Found</h1>
          <BackButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          
          {/* ✅ DYNAMIC BACK BUTTON */}
          <BackButton />

          <h1 className="text-3xl font-bold text-gray-900">{categoryData.name}</h1>
          <p className="text-gray-500 mt-2">
            Showing {categoryData.products.length} results
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
         {/* ... (Rest of content stays the same) ... */}
         <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Filter size={18} /> Filters
            </h3>
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF8237]" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          {categoryData.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice || undefined,
                    rating: product.rating,
                    image: product.image,
                    unit: product.unit
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-xl border border-dashed border-gray-300">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-700">No products here yet</h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
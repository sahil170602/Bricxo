import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import AddToCartButton from '@/components/AddToCartButton';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Search, Package, Star, SlidersHorizontal } from 'lucide-react';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

async function getSearchData(query?: string, catId?: string) {
  // 1. Fetch Categories for the Sidebar
  const categories = await prisma.category.findMany();

  // 2. Build the Filter Object
  const where: any = {};
  
  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } }
    ];
  }
  
  if (catId) {
    where.categoryId = catId;
  }

  // 3. Fetch Products
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return { categories, products };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { categories, products } = await getSearchData(resolvedParams.q, resolvedParams.category);

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton />

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          
          {/* LEFT: FILTER SIDEBAR */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <SlidersHorizontal size={18} />
                <h2 className="font-bold uppercase text-xs tracking-widest">Filters</h2>
              </div>

              <div className="space-y-2">
                <Link 
                  href="/search"
                  className={`block px-4 py-2 rounded-xl text-sm font-bold transition-all ${!resolvedParams.category ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  All Materials
                </Link>
                {categories.map((cat) => (
                  <Link 
                    key={cat.id}
                    href={`/search?category=${cat.id}${resolvedParams.q ? `&q=${resolvedParams.q}` : ''}`}
                    className={`block px-4 py-2 rounded-xl text-sm font-bold transition-all ${resolvedParams.category === cat.id ? 'bg-[#FF8237] text-white shadow-lg shadow-orange-100' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT: RESULTS AREA */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900">
                {resolvedParams.q ? `Results for "${resolvedParams.q}"` : 'Browse Materials'}
              </h1>
              <p className="text-gray-500 font-bold text-sm mt-1">{products.length} Products Found</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group">
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300">
                       {product.image.startsWith('http') ? '📦' : product.image}
                    </div>
                    
                    <div className="mb-auto">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-400">{product.rating}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 leading-tight text-lg mb-2">{product.name}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8237] bg-orange-50 px-2 py-1 rounded">
                        {product.category.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                      <p className="text-xl font-black text-gray-900">₹{product.price}</p>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                <Package className="mx-auto text-gray-200 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
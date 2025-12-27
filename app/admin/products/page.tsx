import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Plus, Trash2, Package, Edit } from 'lucide-react';
import { deleteProduct } from '@/app/actions';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, include: { category: true } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/new" className="bg-[#FF8237] hover:bg-[#E56A1F] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <Plus size={20} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase">
            <tr><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.inStock ? <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">In Stock</span> : <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded">Out of Stock</span>}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></Link>
                  <form action={deleteProduct}><input type="hidden" name="productId" value={product.id} /><button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button></form>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={4} className="p-12 text-center text-gray-400"><Package className="w-12 h-12 mx-auto mb-3 opacity-20" /><p>No products found.</p></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
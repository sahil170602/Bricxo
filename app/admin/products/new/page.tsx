import { PrismaClient } from '@prisma/client';
import { createProduct } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const prisma = new PrismaClient();

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8"><Link href="/admin/products" className="p-2 bg-white border rounded-lg hover:bg-gray-50"><ArrowLeft size={20} /></Link><h1 className="text-2xl font-bold">Add Product</h1></div>
      <form action={createProduct} className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
        <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input name="name" className="w-full p-3 rounded-xl bg-gray-50 border outline-none font-bold" required /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-xs font-bold text-gray-500 uppercase">Price</label><input name="price" type="number" className="w-full p-3 rounded-xl bg-gray-50 border outline-none font-bold" required /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase">Unit</label><input name="unit" className="w-full p-3 rounded-xl bg-gray-50 border outline-none font-bold" required /></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-xs font-bold text-gray-500 uppercase">Category</label><select name="categoryId" className="w-full p-3 rounded-xl bg-gray-50 border outline-none font-bold">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase">Image</label><input name="image" className="w-full p-3 rounded-xl bg-gray-50 border outline-none font-bold" required /></div>
        </div>
        <div><label className="text-xs font-bold text-gray-500 uppercase">Description</label><textarea name="description" rows={3} className="w-full p-3 rounded-xl bg-gray-50 border outline-none"></textarea></div>
        <button className="w-full bg-[#FF8237] hover:bg-[#E56A1F] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"><Save size={20} /> Save Product</button>
      </form>
    </div>
  );
}
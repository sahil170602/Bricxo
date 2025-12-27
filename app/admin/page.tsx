import { PrismaClient } from '@prisma/client';
import { DollarSign, ShoppingBag, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

async function getData() {
  const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });
  const orderCount = await prisma.order.count();
  const pendingCount = await prisma.order.count({ where: { status: 'Processing' } });
  return { revenue: totalRevenue._sum.total || 0, count: orderCount, pending: pendingCount };
}

export default async function AdminPage() {
  const { revenue, count, pending } = await getData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl"><DollarSign size={24} /></div>
          <div><p className="text-sm text-gray-500 font-bold uppercase">Total Revenue</p><h3 className="text-2xl font-bold text-gray-900">₹{revenue.toLocaleString()}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl"><ShoppingBag size={24} /></div>
          <div><p className="text-sm text-gray-500 font-bold uppercase">Total Orders</p><h3 className="text-2xl font-bold text-gray-900">{count}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-xl"><Clock size={24} /></div>
          <div><p className="text-sm text-gray-500 font-bold uppercase">Pending</p><h3 className="text-2xl font-bold text-gray-900">{pending}</h3></div>
        </div>
      </div>
    </div>
  );
}
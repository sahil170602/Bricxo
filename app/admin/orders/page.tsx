import { PrismaClient } from '@prisma/client';
import { updateOrderStatus } from '@/app/actions';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Orders</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase">
              <tr>
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Items</th>
                <th className="p-6">Total</th>
                <th className="p-6">Status</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-6 font-mono text-sm font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-6 text-sm text-gray-600">
                    <div className="font-bold text-gray-900">{order.shippingAddress.split(',')[0]}</div>
                  </td>
                  <td className="p-6 text-sm text-gray-600">
                    {order.items.map(i => <div key={i.id}>{i.product.name} (x{i.quantity})</div>)}
                  </td>
                  <td className="p-6 font-bold text-gray-900">₹{order.total.toLocaleString()}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6">
                    {order.status !== 'Delivered' && (
                      <form action={updateOrderStatus}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition">Mark Delivered</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
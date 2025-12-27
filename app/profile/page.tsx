import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { PrismaClient } from '@prisma/client';
import { Package, Truck, User as UserIcon, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

// Fetch Orders from Database (Newest First)
async function getUserOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true // Get the product details (image, name) for each item
        }
      }
    }
  });
  return orders;
}

export default async function ProfilePage() {
  const orders = await getUserOrders();

  // Mock User Data (Since we don't have real Login yet)
  const user = {
    name: "Sahil Meshram",
    email: "sahil@example.com",
    phone: "+91 98765 43210",
    address: "Plot No 45, Ram Nagar, Nagpur, Maharashtra"
  };

  return (
    <main className="min-h-screen bg-[#E7E3D2]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton />
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* LEFT: User Profile Card */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="h-24 bg-[#FF8237]"></div>
              <div className="px-8 pb-8">
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-900 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                    SM
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500 text-sm mb-6">{user.email}</p>

                <div className="space-y-4 mb-8">
                   <div className="flex items-start gap-3 text-gray-600">
                     <UserIcon size={18} className="mt-1 text-[#FF8237]" />
                     <p className="text-sm font-medium">{user.phone}</p>
                   </div>
                   <div className="flex items-start gap-3 text-gray-600">
                     <MapPin size={18} className="mt-1 text-[#FF8237]" />
                     <p className="text-sm leading-relaxed">{user.address}</p>
                   </div>
                </div>

                <Link href="/login" className="flex items-center justify-center gap-2 w-full py-3 border border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors">
                  <LogOut size={18} /> Logout
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Real Order History */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-[#FF8237]" /> Order History
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                <Link href="/" className="text-[#FF8237] font-bold hover:underline">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                      <div>
                        <span className="font-mono text-gray-400 text-xs font-bold tracking-wider">ORDER #{order.id.slice(-6).toUpperCase()}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide w-fit text-blue-600 bg-blue-50">
                        {order.status}
                      </span>
                    </div>

                    <div className="border-t border-gray-100 my-4"></div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-lg select-none">
                              {/* Show emoji or fallback image */}
                              {item.product.image.startsWith('/') ? '📦' : item.product.image}
                           </div>
                           <div className="flex-1">
                              <p className="text-gray-800 font-medium text-sm">{item.product.name}</p>
                              <p className="text-gray-400 text-xs">{item.quantity} x ₹{item.price}</p>
                           </div>
                           <p className="text-gray-900 font-bold text-sm">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-blue-600 font-bold hover:underline">
                         <Truck size={16} /> Track Order
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
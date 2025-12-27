import Link from 'next/link';
import { LayoutDashboard, Package, LogOut, ShoppingCart } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session');

  // 🔒 SECURITY CHECK 🔒
  // If not admin, redirect to the manager-login page
  if (!isAdmin) {
    redirect('/manager-login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6"><h1 className="text-2xl font-bold">BRICXO <span className="text-[#FF8237]">ADMIN</span></h1></div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
            <Package size={20} />
            <span className="font-medium text-sm">Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
             <ShoppingCart size={20} />
             <span className="font-medium text-sm">Products</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
           <form action={async () => {
             "use server";
             const { adminLogout } = await import('@/app/actions');
             await adminLogout();
             redirect('/manager-login');
           }}>
            <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold w-full">
              <LogOut size={16} /> Logout
            </button>
           </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
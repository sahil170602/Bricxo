import { ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

// ... (Keep interfaces same as before) ...
interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  unit: string;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-[#FF8237]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col">
      
      {/* Badge */}
      {product.originalPrice && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
          SALE
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10 shadow-sm cursor-pointer">
        <Heart size={16} />
      </button>

      {/* CLICKABLE IMAGE AREA - Links to Product Page */}
      <Link href={`/product/${product.id}`} className="block relative h-48 w-full bg-gray-50 flex items-center justify-center p-4 cursor-pointer">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-500">
          {product.image.startsWith('/') ? '📷' : product.image}
        </div> 
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-xs text-[#FF8237] font-semibold bg-orange-50 px-2 py-0.5 rounded">In Stock</span>
        </div>
        
        {/* Title Link */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate hover:text-[#FF8237] transition-colors">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-gray-400 text-xs line-through">₹{product.originalPrice}</p>
            <p className="text-xl font-bold text-gray-900">₹{product.price}<span className="text-xs font-normal text-gray-500">/{product.unit}</span></p>
          </div>
          
          <button className="bg-gray-900 hover:bg-[#FF8237] text-white p-2.5 rounded-lg transition-colors shadow-lg shadow-gray-200 cursor-pointer">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
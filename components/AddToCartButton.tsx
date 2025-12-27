"use client"; // ✅ Essential for interactivity

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { MouseEvent } from "react";

// Define the shape of the product data we expect
type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
};

export default function AddToCartButton({ product }: { product: ProductType }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();  // 🛑 Stop the Link from opening
    e.stopPropagation(); // 🛑 Double safety to stop clicks bubbling up
    addToCart(product);  // ✅ Add to cart
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-[#FF8237] hover:bg-[#E56A1F] text-white p-3 rounded-xl transition-colors shadow-md active:scale-95 cursor-pointer z-20 relative"
      title="Add to Cart"
    >
      <ShoppingCart size={20} />
    </button>
  );
}
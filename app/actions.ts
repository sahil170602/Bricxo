"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- 1. ORDER LOGIC ---

type CartItem = {
  id: string;
  quantity: number;
  price: number;
};

type ShippingDetails = {
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
  paymentMethod: string;
};

export async function createOrder(cart: CartItem[], shipping: ShippingDetails, total: number) {
  try {
    const order = await prisma.order.create({
      data: {
        total: total,
        status: "Processing",
        paymentMethod: shipping.paymentMethod,
        shippingAddress: `${shipping.fullName}, ${shipping.address}, ${shipping.pincode}, Phone: ${shipping.phone}`,
        items: {
          create: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Failed:", error);
    return { success: false, error: "Failed to create order" };
  }
}

/**
 * Fetches all orders associated with a specific phone number.
 * This is used for the Customer Order History page.
 */
export async function getCustomerOrders(phone: string) {
  try {
    return await prisma.order.findMany({
      where: {
        shippingAddress: {
          contains: `Phone: ${phone}`
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Failed to fetch customer orders:", error);
    return [];
  }
}

export async function updateOrderStatus(formData: FormData) {
  const orderId = formData.get('orderId') as string;
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'Delivered' }
    });
    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/profile');
  } catch (error) {
    console.error("Failed to update order:", error);
  }
}

// --- 2. ADMIN LOGIN LOGIC ---

export async function adminLogin(password: string) {
  const ADMIN_PASSWORD = "admin"; // 🔒 CHANGE THIS IF YOU WANT

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return true;
  }
  return false;
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

// --- 3. PRODUCT MANAGEMENT LOGIC ---

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const unit = formData.get('unit') as string;
  const categoryId = formData.get('categoryId') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;

  await prisma.product.create({
    data: {
      name,
      price,
      unit,
      image,
      description,
      categoryId,
      rating: 4.5
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/'); 
  redirect('/admin/products');
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const unit = formData.get('unit') as string;
  const categoryId = formData.get('categoryId') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;
  const inStock = formData.get('inStock') === 'on'; 

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      unit,
      image,
      description,
      categoryId,
      inStock
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/'); 
  redirect('/admin/products');
}

export async function deleteProduct(formData: FormData) {
  const productId = formData.get('productId') as string;
  try {
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath('/admin/products');
    revalidatePath('/'); 
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}
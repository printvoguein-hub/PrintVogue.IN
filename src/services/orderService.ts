import { supabase } from './supabase';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const createOrder = async (orderData: CreateOrderData): Promise<{ success: boolean; orderId?: string; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-order', {
      body: orderData
    });

    if (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      orderId: data.orderId
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        email_notifications (*)
      `)
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
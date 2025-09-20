import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CreateOrderRequest {
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

const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `PV${timestamp}${random}`.toUpperCase();
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const orderRequest: CreateOrderRequest = await req.json()

    // Generate unique order ID
    const orderId = generateOrderId()

    // Create order in database
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        order_id: orderId,
        customer_name: orderRequest.customerName,
        customer_email: orderRequest.customerEmail,
        customer_phone: orderRequest.customerPhone,
        shipping_address: orderRequest.shippingAddress,
        payment_method: orderRequest.paymentMethod,
        subtotal: orderRequest.subtotal,
        shipping_cost: orderRequest.shipping,
        tax_amount: orderRequest.tax,
        total_amount: orderRequest.total,
        status: 'confirmed'
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Create order items
    const orderItems = orderRequest.items.map(item => ({
      order_id: order.id,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      product_image: item.image
    }))

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      throw new Error(`Failed to create order items: ${itemsError.message}`)
    }

    // Prepare email data
    const emailData = {
      orderId: orderId,
      customerName: orderRequest.customerName,
      customerEmail: orderRequest.customerEmail,
      customerPhone: orderRequest.customerPhone,
      shippingAddress: orderRequest.shippingAddress,
      items: orderRequest.items,
      subtotal: orderRequest.subtotal,
      shipping: orderRequest.shipping,
      tax: orderRequest.tax,
      total: orderRequest.total,
      paymentMethod: orderRequest.paymentMethod,
      orderDate: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    }

    // Send emails via edge function
    const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-order-emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData: emailData }),
    })

    const emailResult = await emailResponse.json()

    // Log email notifications
    const emailNotifications = [
      {
        order_id: order.id,
        email_type: 'store_notification',
        recipient_email: 'ashitachauhan2006@gmail.com',
        status: emailResult.success ? 'sent' : 'failed'
      },
      {
        order_id: order.id,
        email_type: 'customer_confirmation',
        recipient_email: orderRequest.customerEmail,
        status: emailResult.success ? 'sent' : 'failed'
      }
    ]

    await supabaseClient
      .from('email_notifications')
      .insert(emailNotifications)

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderId,
        order: order,
        emailSent: emailResult.success
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
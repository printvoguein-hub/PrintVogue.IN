import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
}

const generateStoreEmailHTML = (data: OrderData): string => {
  const itemsHTML = data.items.map(item => `
    <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
      <div style="flex: 1;">
        <h4 style="margin: 0 0 5px 0; color: #333;">${item.name}</h4>
        <p style="margin: 0; color: #666; font-size: 14px;">
          Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}
        </p>
        <p style="margin: 5px 0 0 0; font-weight: bold; color: #D4AF37;">
          ₹${(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #D4AF37; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Order Received!</h1>
        <h2 style="color: white; margin: 10px 0 0 0;">Order #${data.orderId}</h2>
      </div>
      
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h3 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Customer Information
        </h3>
        <p><strong>Name:</strong> ${data.customerName}</p>
        <p><strong>Email:</strong> ${data.customerEmail}</p>
        <p><strong>Phone:</strong> ${data.customerPhone}</p>
        <p><strong>Address:</strong> ${data.shippingAddress}</p>
        <p><strong>Order Date:</strong> ${data.orderDate}</p>
        <p><strong>Payment:</strong> ${data.paymentMethod}</p>
      </div>

      <div style="padding: 20px;">
        <h3 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Order Items (${data.items.length} items, ${data.items.reduce((sum, item) => sum + item.quantity, 0)} total qty)
        </h3>
        ${itemsHTML}
      </div>

      <div style="padding: 20px; background-color: #f9f9f9;">
        <h3 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Order Summary
        </h3>
        <div style="margin: 10px 0;"><span>Subtotal: ₹${data.subtotal.toLocaleString()}</span></div>
        <div style="margin: 10px 0;"><span>Shipping: ${data.shipping === 0 ? 'Free' : `₹${data.shipping}`}</span></div>
        <div style="margin: 10px 0;"><span>Tax: ₹${data.tax.toLocaleString()}</span></div>
        <div style="margin: 15px 0 0 0; padding-top: 15px; border-top: 2px solid #D4AF37; font-weight: bold; font-size: 18px;">
          <span style="color: #D4AF37;">Total: ₹${data.total.toLocaleString()}</span>
        </div>
      </div>

      <div style="padding: 20px; text-align: center; background-color: #333; color: white;">
        <p style="margin: 0;">PrintVogue - Premium Printed Fashion</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">
          Kalyan Nagar, Bangalore | +91 98765 43210
        </p>
      </div>
    </div>
  `;
};

const generateCustomerEmailHTML = (data: OrderData): string => {
  const itemsHTML = data.items.map(item => `
    <div style="padding: 15px 0; border-bottom: 1px solid #eee;">
      <h4 style="margin: 0 0 5px 0; color: #333;">${item.name}</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">
        Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}
      </p>
      <p style="margin: 5px 0 0 0; font-weight: bold; color: #D4AF37;">
        ₹${(item.price * item.quantity).toLocaleString()}
      </p>
    </div>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #D4AF37; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
        <h2 style="color: white; margin: 10px 0 0 0;">Thank you for your purchase</h2>
        <p style="color: white; margin: 10px 0 0 0;">Order #${data.orderId}</p>
      </div>
      
      <div style="padding: 20px;">
        <p>Dear ${data.customerName},</p>
        <p>Thank you for choosing PrintVogue! Your order has been confirmed and we're preparing it for shipment.</p>
        
        <h3 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Order Summary
        </h3>
        ${itemsHTML}

        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
          <h4 style="margin: 0 0 10px 0;">Shipping Information</h4>
          <p style="margin: 0; font-size: 14px;">${data.shippingAddress}</p>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
            Estimated delivery: 3-5 business days
          </p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <p><strong>Order Total: ₹${data.total.toLocaleString()}</strong></p>
          <p>Payment Method: ${data.paymentMethod}</p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <p>We'll send you tracking information once your order ships.</p>
          <p>For any questions, contact us at hello@printvogue.com or +91 98765 43210</p>
        </div>
      </div>

      <div style="padding: 20px; text-align: center; background-color: #333; color: white;">
        <p style="margin: 0;">PrintVogue - Premium Printed Fashion</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">
          Kalyan Nagar, Bangalore | hello@printvogue.com
        </p>
      </div>
    </div>
  `;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderData } = await req.json()

    if (!orderData) {
      throw new Error('Order data is required')
    }

    // Send email to store owner
    const storeEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PrintVogue <orders@printvogue.com>',
        to: ['ashitachauhan2006@gmail.com'],
        subject: `New Order #${orderData.orderId} - ₹${orderData.total.toLocaleString()}`,
        html: generateStoreEmailHTML(orderData),
      }),
    })

    // Send confirmation email to customer
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PrintVogue <orders@printvogue.com>',
        to: [orderData.customerEmail],
        subject: `Order Confirmation #${orderData.orderId} - PrintVogue`,
        html: generateCustomerEmailHTML(orderData),
      }),
    })

    const storeEmailResult = await storeEmailResponse.json()
    const customerEmailResult = await customerEmailResponse.json()

    return new Response(
      JSON.stringify({
        success: true,
        storeEmail: storeEmailResult,
        customerEmail: customerEmailResult,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending emails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
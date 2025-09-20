/*
  # Create Orders and Email System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_id` (text, unique order identifier)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `shipping_address` (text)
      - `payment_method` (text)
      - `subtotal` (decimal)
      - `shipping_cost` (decimal)
      - `tax_amount` (decimal)
      - `total_amount` (decimal)
      - `status` (text)
      - `created_at` (timestamp)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_name` (text)
      - `product_price` (decimal)
      - `quantity` (integer)
      - `size` (text)
      - `color` (text)
      - `product_image` (text)
    - `email_notifications`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `email_type` (text)
      - `recipient_email` (text)
      - `sent_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and service role
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  payment_method text NOT NULL DEFAULT 'Cash on Delivery',
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  tax_amount decimal(10,2) NOT NULL DEFAULT 0,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  product_price decimal(10,2) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  size text NOT NULL,
  color text NOT NULL,
  product_image text,
  created_at timestamptz DEFAULT now()
);

-- Create email_notifications table
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  email_type text NOT NULL, -- 'store_notification' or 'customer_confirmation'
  recipient_email text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'sent', -- 'sent', 'failed'
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Allow service role full access to orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow authenticated users to read orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for order_items
CREATE POLICY "Allow service role full access to order_items"
  ON order_items
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow authenticated users to read order_items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for email_notifications
CREATE POLICY "Allow service role full access to email_notifications"
  ON email_notifications
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow authenticated users to read email_notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_order_id ON email_notifications(order_id);
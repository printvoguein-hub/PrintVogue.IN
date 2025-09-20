export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CustomPrintOrder {
  id: string;
  productType: string;
  size: string;
  color: string;
  uploadedImage?: string;
  notes: string;
  price: number;
}
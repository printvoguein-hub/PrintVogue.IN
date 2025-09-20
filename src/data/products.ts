export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Shirts' | 'T-Shirts' | 'Shorts' | 'Pants';
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  // Shirts
  {
    id: 'shirt-001',
    name: 'Royal Paisley Dress Shirt',
    description: 'Luxurious paisley print on premium cotton blend. Perfect for sophisticated evenings and special occasions.',
    price: 3999,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#0B1426', '#8B4513', '#2F4F4F']
  },
  {
    id: 'shirt-002',
    name: 'Midnight Floral Elegance',
    description: 'Delicate floral print on silky smooth fabric. A statement piece that exudes feminine grace and elegance.',
    price: 4299,
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2F4F4F', '#483D8B']
  },
  {
    id: 'shirt-003',
    name: 'Geometric Luxury Print',
    description: 'Bold geometric patterns meet classic tailoring. A modern interpretation of timeless elegance.',
    price: 3799,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#D3D3D3', '#696969']
  },
  {
    id: 'shirt-004',
    name: 'Vintage Rose Botanical',
    description: 'Romantic rose prints on premium silk blend. Timeless beauty meets contemporary style.',
    price: 4599,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#F5F5DC', '#FFB6C1', '#DDA0DD']
  },
  {
    id: 'shirt-005',
    name: 'Abstract Art Couture',
    description: 'Exclusive abstract prints inspired by contemporary art. A wearable masterpiece for the discerning fashion lover.',
    price: 5199,
    image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#FFFFFF', '#D4AF37']
  },

  // T-Shirts
  {
    id: 'tshirt-001',
    name: 'Minimalist Logo Tee',
    description: 'Clean, understated design with our signature logo. Premium cotton for ultimate comfort and style.',
    price: 1999,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: ['#000000', '#FFFFFF', '#808080']
  },
  {
    id: 'tshirt-002',
    name: 'Urban Street Art Print',
    description: 'Bold street art inspired design. Express your rebellious spirit with this premium cotton tee.',
    price: 2299,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#FF6347', '#32CD32']
  },
  {
    id: 'tshirt-003',
    name: 'Celestial Dreams Tee',
    description: 'Ethereal moon and stars design. Soft, breathable fabric perfect for day-to-night comfort.',
    price: 2199,
    image: 'https://images.pexels.com/photos/8839876/pexels-photo-8839876.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#191970', '#000080', '#4B0082']
  },
  {
    id: 'tshirt-004',
    name: 'Vintage Typography',
    description: 'Classic vintage lettering with modern appeal. A perfect blend of nostalgia and contemporary style.',
    price: 2399,
    image: 'https://images.pexels.com/photos/8839890/pexels-photo-8839890.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#8B4513', '#F5DEB3', '#D2691E']
  },
  {
    id: 'tshirt-005',
    name: 'Nature Zen Print',
    description: 'Serene nature-inspired design for the eco-conscious fashionista. Organic cotton blend.',
    price: 2599,
    image: 'https://images.pexels.com/photos/9558618/pexels-photo-9558618.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#228B22', '#32CD32', '#9ACD32']
  },
  {
    id: 'tshirt-006',
    name: 'Golden Ratio Luxury Tee',
    description: 'Mathematical beauty meets fashion. Premium gold foil print on ultra-soft cotton.',
    price: 3299,
    image: 'https://images.pexels.com/photos/8839899/pexels-photo-8839899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#D4AF37', '#FFFFFF']
  },

  // Shorts
  {
    id: 'shorts-001',
    name: 'Tropical Paradise Shorts',
    description: 'Vibrant tropical prints for summer adventures. Lightweight, quick-dry fabric with premium comfort.',
    price: 2799,
    image: 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shorts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#FF6347', '#FF4500', '#FFA500']
  },
  {
    id: 'shorts-002',
    name: 'Monochrome Geometric',
    description: 'Sophisticated black and white geometric patterns. Perfect for casual elegance and urban style.',
    price: 2999,
    image: 'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#FFFFFF', '#808080']
  },
  {
    id: 'shorts-003',
    name: 'Bohemian Chic Shorts',
    description: 'Free-spirited prints with vintage flair. Comfortable fit for festival season and weekend adventures.',
    price: 2599,
    image: 'https://images.pexels.com/photos/8839892/pexels-photo-8839892.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shorts',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#DDA0DD', '#FFB6C1', '#F0E68C']
  },
  {
    id: 'shorts-004',
    name: 'Athletic Luxe Print',
    description: 'Performance meets style. Moisture-wicking fabric with exclusive athletic-inspired prints.',
    price: 3199,
    image: 'https://images.pexels.com/photos/7679719/pexels-photo-7679719.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#00BFFF', '#FFFFFF']
  },
  {
    id: 'shorts-005',
    name: 'Sunset Ombre Shorts',
    description: 'Gradient sunset colors in a sophisticated print. Breathable fabric perfect for warm weather styling.',
    price: 2899,
    image: 'https://images.pexels.com/photos/8839897/pexels-photo-8839897.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Shorts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#FF6347', '#FFA500', '#FFD700']
  },

  // Pants
  {
    id: 'pants-001',
    name: 'Executive Printed Trousers',
    description: 'Subtle professional prints for the modern executive. Tailored fit with premium stretch fabric.',
    price: 4899,
    image: 'https://images.pexels.com/photos/7679718/pexels-photo-7679718.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2F4F4F', '#000080', '#8B4513']
  },
  {
    id: 'pants-002',
    name: 'Artistic Palazzo Pants',
    description: 'Flowing palazzo style with artistic prints. Comfortable elegance for the creative soul.',
    price: 3799,
    image: 'https://images.pexels.com/photos/8839894/pexels-photo-8839894.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#4B0082', '#8B008B', '#9932CC']
  },
  {
    id: 'pants-003',
    name: 'Casual Comfort Print Pants',
    description: 'Relaxed fit with contemporary prints. Perfect for weekend leisure and casual outings.',
    price: 3299,
    image: 'https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#708090', '#2F4F4F', '#696969']
  },
  {
    id: 'pants-004',
    name: 'Designer Jogger Prints',
    description: 'Luxury athleisure with exclusive designer prints. Comfortable style for active lifestyles.',
    price: 4199,
    image: 'https://images.pexels.com/photos/8839895/pexels-photo-8839895.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#D4AF37', '#FFFFFF']
  },
  {
    id: 'pants-005',
    name: 'Evening Elegance Pants',
    description: 'Sophisticated evening wear with metallic accent prints. Perfect for special occasions and night out.',
    price: 5499,
    image: 'https://images.pexels.com/photos/8839896/pexels-photo-8839896.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#C0C0C0', '#D4AF37']
  }
];
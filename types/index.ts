export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  averageRating: number;
  gender: 'man' | 'woman';
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

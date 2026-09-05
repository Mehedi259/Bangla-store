export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  weight?: string;
  category: string;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

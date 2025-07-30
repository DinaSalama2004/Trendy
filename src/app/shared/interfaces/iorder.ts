export interface Iorder {
    _id: string;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  
    shippingAddress: ShippingAddress;
    user: User;
    cartItems: CartItem[];
  }
  
  export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export interface CartItem {
    _id: string;
    count: number;
    price: number;
    product: Product;
  }
  
  export interface Product {
    _id: string;
    title: string;
    imageCover: string;
    ratingsQuantity: number;
    ratingsAverage: number;
    subcategory: Subcategory[];
    category: Category;
    brand: Brand;
    id: string;
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
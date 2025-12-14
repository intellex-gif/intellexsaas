export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
  ACCOUNTANT = 'ACCOUNTANT'
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  unit: 'pc' | 'kg' | 'carton' | 'liter';
  price: number;
  costPrice: number;
  stock: number;
  minStockLevel: number;
  expiryDate?: string;
}

export interface CartItem extends Product {
  quantity: number;
  discount: number; // Percentage
}

export interface Sale {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'SPLIT';
  timestamp: string;
  cashierName: string;
}

export interface DashboardStats {
  totalSales: number;
  transactionCount: number;
  lowStockCount: number;
  profit: number;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  color: string;
  recommended?: boolean;
}
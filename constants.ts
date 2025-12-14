import { Product, Plan } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', sku: 'DAAL-001', barcode: '8901234567890', name: 'Daal Chana Premium', category: 'Grains', unit: 'kg', price: 280, costPrice: 220, stock: 450, minStockLevel: 50, expiryDate: '2025-12-01' },
  { id: '2', sku: 'OIL-002', barcode: '8901234567891', name: 'Sunridge Cooking Oil 5L', category: 'Oil', unit: 'pc', price: 3200, costPrice: 2800, stock: 120, minStockLevel: 20 },
  { id: '3', sku: 'RICE-003', barcode: '8901234567892', name: 'Super Basmati Rice', category: 'Grains', unit: 'kg', price: 350, costPrice: 290, stock: 800, minStockLevel: 100 },
  { id: '4', sku: 'TEA-004', barcode: '8901234567893', name: 'Tapal Danedar 950g', category: 'Beverages', unit: 'pc', price: 1450, costPrice: 1300, stock: 60, minStockLevel: 15 },
  { id: '5', sku: 'SUGAR-005', barcode: '8901234567894', name: 'Refined Sugar', category: 'Baking', unit: 'kg', price: 160, costPrice: 145, stock: 1200, minStockLevel: 200 },
  { id: '6', sku: 'MILK-006', barcode: '8901234567895', name: 'Olpers Milk 1L', category: 'Dairy', unit: 'carton', price: 3200, costPrice: 2900, stock: 45, minStockLevel: 10, expiryDate: '2024-08-15' },
  { id: '7', sku: 'SPICE-007', barcode: '8901234567896', name: 'National Biryani Masala', category: 'Spices', unit: 'pc', price: 120, costPrice: 85, stock: 300, minStockLevel: 50 },
  { id: '8', sku: 'SOAP-008', barcode: '8901234567897', name: 'Lux Soap Bar', category: 'Personal Care', unit: 'pc', price: 150, costPrice: 110, stock: 15, minStockLevel: 30 }, // Low stock
];

export const SAAS_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rs 5,000/mo',
    color: 'bg-green-100 border-green-200 text-green-800',
    features: ['1 Branch', 'Single User', 'Basic Reporting', 'Email Support']
  },
  {
    id: 'business',
    name: 'Business',
    price: 'Rs 12,000/mo',
    color: 'bg-blue-100 border-blue-200 text-blue-800',
    recommended: true,
    features: ['Up to 5 Branches', 'Advanced Inventory', 'Role-based Access', 'Inventory Alerts', 'Priority Support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    color: 'bg-purple-100 border-purple-200 text-purple-800',
    features: ['Unlimited Branches', 'AI Forecasting', 'Dedicated Account Manager', 'Custom Integrations', 'SLA']
  }
];

export const MOCK_SALES_HISTORY = [
  { name: 'Mon', sales: 120000, profit: 24000 },
  { name: 'Tue', sales: 145000, profit: 32000 },
  { name: 'Wed', sales: 132000, profit: 28000 },
  { name: 'Thu', sales: 160000, profit: 38000 },
  { name: 'Fri', sales: 210000, profit: 45000 },
  { name: 'Sat', sales: 280000, profit: 62000 },
  { name: 'Sun', sales: 250000, profit: 55000 },
];
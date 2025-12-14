import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, RefreshCcw, ScanLine } from 'lucide-react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface POSTerminalProps {
  onProcessSale: (total: number, items: CartItem[]) => void;
}

const POSTerminal: React.FC<POSTerminalProps> = ({ onProcessSale }) => {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePaymentMethod, setActivePaymentMethod] = useState<'CASH' | 'CARD' | null>(null);

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || 
                         p.sku.toLowerCase().includes(query.toLowerCase()) ||
                         p.barcode.includes(query);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity * (1 - item.discount / 100)), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onProcessSale(calculateTotal(), cart);
    setCart([]);
    setActivePaymentMethod(null);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F9') setActivePaymentMethod('CASH');
      if (e.key === 'F10') setActivePaymentMethod('CARD');
      if (e.key === 'Enter' && e.ctrlKey) handleCheckout();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, activePaymentMethod]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
     // Focus search on mount for speed
     searchInputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-4 p-4 bg-slate-50">
      {/* Left: Product Selection */}
      <div className="lg:w-2/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Scan Barcode / Search Name or SKU (F2)"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ScanLine className="absolute right-3 top-3 text-slate-400 w-5 h-5 cursor-pointer" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50/50">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group h-36"
            >
              <div>
                <h3 className="font-semibold text-slate-800 line-clamp-2 text-sm">{product.name}</h3>
                <span className="text-xs text-slate-500 font-mono">{product.sku}</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div>
                  <div className="text-indigo-600 font-bold">Rs {product.price}</div>
                  <div className="text-[10px] text-slate-400">{product.stock} {product.unit} left</div>
                </div>
                <button className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Cart & Checkout */}
      <div className="lg:w-1/3 flex flex-col bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            Current Order
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{cart.length} items</span>
          </h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ScanLine className="w-12 h-12 mb-2 opacity-50" />
              <p>Scan item or select from list</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{item.name}</div>
                  <div className="text-xs text-slate-500">Rs {item.price} / {item.unit}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-1 py-0.5">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-500"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-500"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-right w-16">
                    <div className="text-sm font-bold text-slate-800">{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals & Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-xl space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Subtotal</span>
              <span>Rs {calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Tax (0%)</span>
              <span>Rs 0</span>
            </div>
            <div className="flex justify-between text-slate-900 text-2xl font-bold pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>Rs {calculateTotal().toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={() => setActivePaymentMethod('CASH')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl font-semibold border transition-all ${activePaymentMethod === 'CASH' ? 'bg-green-600 text-white border-green-600 ring-2 ring-green-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-green-50'}`}
             >
               <Banknote className="w-5 h-5" />
               Cash (F9)
             </button>
             <button 
                onClick={() => setActivePaymentMethod('CARD')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl font-semibold border transition-all ${activePaymentMethod === 'CARD' ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50'}`}
             >
               <CreditCard className="w-5 h-5" />
               Card (F10)
             </button>
          </div>

          <button 
            disabled={cart.length === 0 || !activePaymentMethod}
            onClick={handleCheckout}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2
              ${cart.length > 0 && activePaymentMethod ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30' : 'bg-slate-300 cursor-not-allowed'}`}
          >
            {cart.length > 0 && activePaymentMethod ? 'Complete Sale (Ctrl+Enter)' : 'Select Payment to Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSTerminal;
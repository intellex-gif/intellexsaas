import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { AlertTriangle, CheckCircle, Package } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Product Name</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">SKU / Barcode</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Price (PKR)</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">Stock Level</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_PRODUCTS.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                            <div className="font-medium text-slate-800">{product.name}</div>
                            {product.expiryDate && <div className="text-xs text-slate-400">Exp: {product.expiryDate}</div>}
                        </td>
                        <td className="p-4 text-sm text-slate-600 font-mono">
                            <div>{product.sku}</div>
                            <div className="text-xs text-slate-400">{product.barcode}</div>
                        </td>
                        <td className="p-4">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{product.category}</span>
                        </td>
                        <td className="p-4 text-right font-medium text-slate-800">
                            {product.price.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                            {product.stock} <span className="text-slate-400 text-xs">{product.unit}</span>
                        </td>
                        <td className="p-4 flex justify-center">
                            {product.stock < product.minStockLevel ? (
                                <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-full text-xs font-medium border border-rose-100">
                                    <AlertTriangle size={12} /> Low Stock
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium border border-emerald-100">
                                    <CheckCircle size={12} /> Good
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
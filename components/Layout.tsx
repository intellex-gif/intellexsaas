import React from 'react';
import { LayoutGrid, ShoppingCart, Package, Users, Settings, LogOut, Store } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'pos', label: 'POS Terminal', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'subscription', label: 'Subscription', icon: Store },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
           <div className="bg-indigo-600 p-2 rounded-lg">
             <ShoppingCart className="text-white w-6 h-6" />
           </div>
           <div>
             <h1 className="font-bold text-white text-lg tracking-tight">RetailFlow</h1>
             <p className="text-xs text-slate-500">Enterprise SaaS</p>
           </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-3">
             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
               LCC
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-semibold text-white truncate">Lahore C&C</p>
               <p className="text-xs text-slate-500">Business Plan</p>
             </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
            <h1 className="font-bold">RetailFlow</h1>
            <button className="text-slate-300"><Settings size={20} /></button>
        </div>

        <main className="flex-1 overflow-auto bg-slate-50">
           {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
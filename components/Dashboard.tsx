import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, AlertTriangle, Package, BrainCircuit, Sparkles, ShoppingBag } from 'lucide-react';
import { MOCK_SALES_HISTORY, MOCK_PRODUCTS } from '../constants';
import { getGeminiInsights, getGoToMarketStrategy } from '../services/geminiService';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>('');
  const [gtmStrategy, setGtmStrategy] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loadingGtm, setLoadingGtm] = useState(false);

  // Derived stats from mock data
  const stats: DashboardStats = {
    totalSales: 1250000,
    transactionCount: 452,
    lowStockCount: MOCK_PRODUCTS.filter(p => p.stock < p.minStockLevel).length,
    profit: 320000
  };

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    const context = `
      Total Sales: Rs ${stats.totalSales}
      Low Stock Items: ${stats.lowStockCount}
      Net Profit: Rs ${stats.profit}
      Top Selling Categories: Grains, Oil
      Recent Trend: Sales up by 15% on weekends.
      Low Stock Items: ${MOCK_PRODUCTS.filter(p => p.stock < p.minStockLevel).map(p => p.name).join(', ')}
    `;
    const result = await getGeminiInsights(context);
    setInsights(result);
    setLoadingInsights(false);
  };

  const handleGenerateGTM = async () => {
      setLoadingGtm(true);
      const res = await getGoToMarketStrategy();
      setGtmStrategy(res);
      setLoadingGtm(false);
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
           <p className="text-slate-500 text-sm">Welcome back, Owner. Here is your store overview.</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             Live Updates
           </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `Rs ${stats.totalSales.toLocaleString()}`, icon: TrendingUp, color: 'bg-indigo-600', trend: '+12%' },
          { label: 'Transactions', value: stats.transactionCount, icon: ShoppingBag, color: 'bg-blue-500', trend: '+5%' },
          { label: 'Low Stock Alerts', value: stats.lowStockCount, icon: AlertTriangle, color: 'bg-rose-500', trend: 'Action Needed' },
          { label: 'Net Profit', value: `Rs ${stats.profit.toLocaleString()}`, icon: Users, color: 'bg-emerald-500', trend: '+18%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              <span className={`text-xs font-semibold mt-2 inline-block ${stat.trend.includes('Action') ? 'text-rose-600' : 'text-emerald-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className={`${stat.color} p-3 rounded-lg text-white shadow-lg shadow-indigo-100`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sales & Profit Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SALES_HISTORY}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <BrainCircuit size={100} />
          </div>
          
          <div className="flex items-center gap-2 mb-4">
             <Sparkles className="text-yellow-400" size={20} />
             <h3 className="text-lg font-bold">Gemini AI Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
             {!insights && !gtmStrategy && (
                 <div className="text-slate-400 text-sm text-center mt-10">
                    Click below to analyze your store performance using Google Gemini 2.5.
                 </div>
             )}
             
             {loadingInsights && (
                 <div className="animate-pulse space-y-2">
                    <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-700 rounded w-full"></div>
                    <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                 </div>
             )}

             {insights && (
                 <div className="prose prose-invert prose-sm">
                    <div className="text-sm leading-relaxed whitespace-pre-line">{insights}</div>
                 </div>
             )}
              
             {gtmStrategy && !loadingInsights && (
                 <div className="mt-4 border-t border-slate-700 pt-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">Bonus: GTM Strategy</h4>
                    <div className="text-xs text-slate-300 whitespace-pre-line">{gtmStrategy}</div>
                 </div>
             )}
          </div>

          <div className="flex flex-col gap-2">
            <button 
                onClick={handleGenerateInsights}
                disabled={loadingInsights}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition-colors text-sm flex justify-center items-center gap-2"
            >
                {loadingInsights ? 'Analyzing...' : 'Generate Store Insights'}
            </button>
            <button
                onClick={handleGenerateGTM}
                disabled={loadingGtm}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors text-sm"
            >
                {loadingGtm ? 'Planning...' : 'Ask AI: GTM Strategy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
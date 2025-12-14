import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import POSTerminal from './components/POSTerminal';
import Inventory from './components/Inventory';
import Subscription from './components/Subscription';
import { CartItem } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  // Mock function to handle sales processing
  const handleProcessSale = (total: number, items: CartItem[]) => {
    console.log("Processing sale:", { total, items });
    // In a real app, this would hit the API and update global state
    alert(`Sale completed! Total: Rs ${total.toLocaleString()}`);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POSTerminal onProcessSale={handleProcessSale} />;
      case 'inventory':
        return <Inventory />;
      case 'subscription':
        return <Subscription />;
      default:
        return <div className="p-10 text-center text-slate-500">Feature coming soon: {activeView}</div>;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
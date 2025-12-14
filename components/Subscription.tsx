import React from 'react';
import { SAAS_PLANS } from '../constants';
import { Check } from 'lucide-react';

const Subscription: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Upgrade your Enterprise</h2>
            <p className="text-slate-500 mt-2">Choose the plan that fits your retail scale. All plans include automated backups.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAAS_PLANS.map(plan => (
                <div key={plan.id} className={`relative bg-white rounded-2xl border ${plan.recommended ? 'border-indigo-500 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'} p-6 flex flex-col`}>
                    {plan.recommended && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Most Popular
                        </div>
                    )}
                    <h3 className="text-lg font-semibold text-slate-700">{plan.name}</h3>
                    <div className="mt-4 mb-6">
                        <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                <div className={`mt-0.5 rounded-full p-0.5 ${plan.recommended ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <Check size={12} />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        plan.recommended 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}>
                        {plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'}
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Subscription;
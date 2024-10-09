
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MousePointer, RefreshCw, ArrowRight, DollarSign, Target } from 'lucide-react';

const AdOpsTools = () => {
  const [activeTab, setActiveTab] = useState('cpm');
  const [result, setResult] = useState(null);

  // Refs for CPM calculator
  const totalCostRef = useRef(null);
  const cpmRef = useRef(null);
  const impressionsRef = useRef(null);

  // Refs for CTR calculator
  const ctrImpressionsRef = useRef(null);
  const clicksRef = useRef(null);

  const calculateCPM = () => {
    const totalCost = parseFloat(totalCostRef.current.value);
    const cpm = parseFloat(cpmRef.current.value);
    const impressions = parseFloat(impressionsRef.current.value);

    if (totalCost && impressions) {
      const calculatedCPM = (totalCost / impressions) * 1000;
      setResult(`CPM: $${calculatedCPM.toFixed(2)}`);
    } else if (cpm && impressions) {
      const calculatedCost = (cpm * impressions) / 1000;
      setResult(`Costo Total: $${calculatedCost.toFixed(2)}`);
    } else if (totalCost && cpm) {
      const calculatedImpressions = (totalCost / cpm) * 1000;
      setResult(`Impresiones: ${calculatedImpressions.toFixed(0)}`);
    } else {
      setResult('Por favor, ingrese al menos dos valores para calcular.');
    }
  };

  const calculateCTR = () => {
    const impressions = parseFloat(ctrImpressionsRef.current.value);
    const clicks = parseFloat(clicksRef.current.value);

    if (impressions && clicks) {
      const ctr = (clicks / impressions) * 100;
      setResult(`CTR: ${ctr.toFixed(2)}%`);
    } else {
      setResult('Por favor, ingrese tanto impresiones como clicks para calcular CTR.');
    }
  };

  const reset = () => {
    if (activeTab === 'cpm') {
      totalCostRef.current.value = '';
      cpmRef.current.value = '';
      impressionsRef.current.value = '';
    } else {
      ctrImpressionsRef.current.value = '';
      clicksRef.current.value = '';
    }
    setResult(null);
  };

  const InputWithIcon = ({ icon, inputRef, placeholder }) => (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        className="pl-10 w-full py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-lg">
          <div className="p-6 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">AdOps Tools</h1>
            
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              {['cpm', 'ctr'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Calculadora {tab.toUpperCase()}
                </button>
              ))}
            </div>
            
            <CardContent className="p-0">
              {activeTab === 'cpm' ? (
                <>
                  <InputWithIcon
                    icon={<DollarSign className="w-5 h-5" />}
                    inputRef={totalCostRef}
                    placeholder="Costo Total"
                  />
                  <InputWithIcon
                    icon={<Target className="w-5 h-5" />}
                    inputRef={cpmRef}
                    placeholder="CPM"
                  />
                  <InputWithIcon
                    icon={<Eye className="w-5 h-5" />}
                    inputRef={impressionsRef}
                    placeholder="Impresiones"
                  />
                </>
              ) : (
                <>
                  <InputWithIcon
                    icon={<Eye className="w-5 h-5" />}
                    inputRef={ctrImpressionsRef}
                    placeholder="Impresiones"
                  />
                  <InputWithIcon
                    icon={<MousePointer className="w-5 h-5" />}
                    inputRef={clicksRef}
                    placeholder="Clicks"
                  />
                </>
              )}
              
              <div className="flex space-x-4 mt-6">
                <Button onClick={reset} variant="outline" className="flex-1 py-3">
                  <RefreshCw className="w-4 h-4 mr-2" /> Reiniciar
                </Button>
                <Button 
                  onClick={activeTab === 'cpm' ? calculateCPM : calculateCTR} 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3"
                >
                  Calcular <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {result && (
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md">
                  {result}
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdOpsTools;

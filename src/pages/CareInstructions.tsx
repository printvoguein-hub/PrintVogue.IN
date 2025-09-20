import React, { useState } from 'react';
import { Droplets, Wind, Sun, AlertTriangle, Sparkles } from 'lucide-react';

const CareInstructions: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<'all' | 'cotton' | 'silk' | 'polyester' | 'blends'>('all');

  const careData = {
    cotton: {
      name: 'Cotton',
      icon: '🌿',
      color: 'from-green-500 to-emerald-500',
      instructions: [
        { icon: <Droplets className="w-5 h-5" />, title: 'Washing', text: 'Machine wash cold (30°C max). Use gentle cycle for delicate cotton items.' },
        { icon: <Wind className="w-5 h-5" />, title: 'Drying', text: 'Tumble dry low heat or air dry. Remove while slightly damp to prevent wrinkles.' },
        { icon: <Sun className="w-5 h-5" />, title: 'Ironing', text: 'Iron on medium-high heat while damp. Use steam for best results.' },
        { icon: <AlertTriangle className="w-5 h-5" />, title: 'Special Care', text: 'Avoid bleach. Wash dark colors separately to prevent bleeding.' }
      ]
    },
    silk: {
      name: 'Silk',
      icon: '✨',
      color: 'from-purple-500 to-pink-500',
      instructions: [
        { icon: <Droplets className="w-5 h-5" />, title: 'Washing', text: 'Hand wash in cold water with silk-specific detergent. Never wring or twist.' },
        { icon: <Wind className="w-5 h-5" />, title: 'Drying', text: 'Lay flat on towel away from direct sunlight. Never tumble dry.' },
        { icon: <Sun className="w-5 h-5" />, title: 'Ironing', text: 'Iron on low heat (silk setting) while damp. Use pressing cloth.' },
        { icon: <AlertTriangle className="w-5 h-5" />, title: 'Special Care', text: 'Store on padded hangers. Avoid deodorants and perfumes on silk.' }
      ]
    },
    polyester: {
      name: 'Polyester',
      icon: '🔬',
      color: 'from-blue-500 to-cyan-500',
      instructions: [
        { icon: <Droplets className="w-5 h-5" />, title: 'Washing', text: 'Machine wash warm (40°C). Use regular cycle. Polyester is very durable.' },
        { icon: <Wind className="w-5 h-5" />, title: 'Drying', text: 'Tumble dry medium heat. Remove promptly to prevent static.' },
        { icon: <Sun className="w-5 h-5" />, title: 'Ironing', text: 'Iron on low-medium heat. Use pressing cloth to prevent shine.' },
        { icon: <AlertTriangle className="w-5 h-5" />, title: 'Special Care', text: 'Fabric softener helps reduce static. Avoid high heat to prevent melting.' }
      ]
    },
    blends: {
      name: 'Blends',
      icon: '🌈',
      color: 'from-orange-500 to-red-500',
      instructions: [
        { icon: <Droplets className="w-5 h-5" />, title: 'Washing', text: 'Follow care for the most delicate fiber in the blend. Usually cold water.' },
        { icon: <Wind className="w-5 h-5" />, title: 'Drying', text: 'Low heat tumble dry or air dry. Check garment label for specific instructions.' },
        { icon: <Sun className="w-5 h-5" />, title: 'Ironing', text: 'Use temperature for most heat-sensitive fiber. Test on hidden area first.' },
        { icon: <AlertTriangle className="w-5 h-5" />, title: 'Special Care', text: 'Read garment labels carefully. Blends may have unique requirements.' }
      ]
    }
  };

  const washingSymbols = [
    { symbol: '🌊', meaning: 'Machine wash', temp: 'Normal cycle' },
    { symbol: '❄️', meaning: 'Cold wash', temp: '30°C or below' },
    { symbol: '🔥', meaning: 'Warm wash', temp: '40°C' },
    { symbol: '🚫', meaning: 'Do not wash', temp: 'Dry clean only' },
    { symbol: '⭕', meaning: 'Do not bleach', temp: 'No chlorine bleach' },
    { symbol: '🌀', meaning: 'Tumble dry', temp: 'Machine dry OK' },
    { symbol: '☀️', meaning: 'Line dry', temp: 'Air dry naturally' },
    { symbol: '🔥', meaning: 'Iron', temp: 'Safe to iron' }
  ];

  const materials = ['all', 'cotton', 'silk', 'polyester', 'blends'] as const;
  const filteredMaterials = selectedMaterial === 'all' 
    ? Object.entries(careData) 
    : [[selectedMaterial, careData[selectedMaterial]]];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Keep it fresh — how to care for your clothes</h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Extend the life of your garments with proper care techniques for every fabric type
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Material Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Fabric Type</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {materials.map((material) => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                    selectedMaterial === material
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700'
                  }`}
                  aria-pressed={selectedMaterial === material}
                >
                  {material === 'all' ? 'All Materials' : material}
                </button>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredMaterials.map(([key, material]) => (
              <div key={key} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${material.color} p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{material.icon}</span>
                    <h3 className="text-2xl font-bold">{material.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {material.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 flex-shrink-0">
                        {instruction.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{instruction.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{instruction.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Washing Symbols Guide */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Washing Symbols Decoded</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {washingSymbols.map((symbol, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl mb-3">{symbol.symbol}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{symbol.meaning}</h4>
                  <p className="text-sm text-gray-600">{symbol.temp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              💡 Quick Care Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Always check care labels before washing</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Separate colors to prevent bleeding</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Turn garments inside out to protect prints</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Use mesh bags for delicate items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareInstructions;
import React, { useState } from 'react';
import { Ruler, User, ArrowRight } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'tops' | 'bottoms' | 'shoes'>('tops');
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  const sizeCharts = {
    tops: {
      title: 'Tops & Shirts',
      headers: ['Size', 'Chest/Bust', 'Waist', 'Length'],
      data: [
        { size: 'XS', chest: unit === 'cm' ? '81-86' : '32-34', waist: unit === 'cm' ? '61-66' : '24-26', length: unit === 'cm' ? '61' : '24' },
        { size: 'S', chest: unit === 'cm' ? '86-91' : '34-36', waist: unit === 'cm' ? '66-71' : '26-28', length: unit === 'cm' ? '63' : '25' },
        { size: 'M', chest: unit === 'cm' ? '91-97' : '36-38', waist: unit === 'cm' ? '71-76' : '28-30', length: unit === 'cm' ? '65' : '26' },
        { size: 'L', chest: unit === 'cm' ? '97-102' : '38-40', waist: unit === 'cm' ? '76-81' : '30-32', length: unit === 'cm' ? '67' : '26.5' },
        { size: 'XL', chest: unit === 'cm' ? '102-107' : '40-42', waist: unit === 'cm' ? '81-86' : '32-34', length: unit === 'cm' ? '69' : '27' },
      ]
    },
    bottoms: {
      title: 'Bottoms & Pants',
      headers: ['Size', 'Waist', 'Hips', 'Inseam'],
      data: [
        { size: 'XS', waist: unit === 'cm' ? '61-66' : '24-26', hips: unit === 'cm' ? '86-91' : '34-36', inseam: unit === 'cm' ? '76' : '30' },
        { size: 'S', waist: unit === 'cm' ? '66-71' : '26-28', hips: unit === 'cm' ? '91-97' : '36-38', inseam: unit === 'cm' ? '78' : '31' },
        { size: 'M', waist: unit === 'cm' ? '71-76' : '28-30', hips: unit === 'cm' ? '97-102' : '38-40', inseam: unit === 'cm' ? '80' : '32' },
        { size: 'L', waist: unit === 'cm' ? '76-81' : '30-32', hips: unit === 'cm' ? '102-107' : '40-42', inseam: unit === 'cm' ? '82' : '32.5' },
        { size: 'XL', waist: unit === 'cm' ? '81-86' : '32-34', hips: unit === 'cm' ? '107-112' : '42-44', inseam: unit === 'cm' ? '84' : '33' },
      ]
    },
    shoes: {
      title: 'Footwear',
      headers: ['Size', 'US', 'EU', 'Foot Length'],
      data: [
        { size: '6', us: '6', eu: '36', length: unit === 'cm' ? '23' : '9.1' },
        { size: '7', us: '7', eu: '37', length: unit === 'cm' ? '24' : '9.4' },
        { size: '8', us: '8', eu: '38', length: unit === 'cm' ? '25' : '9.8' },
        { size: '9', us: '9', eu: '39', length: unit === 'cm' ? '26' : '10.2' },
        { size: '10', us: '10', eu: '40', length: unit === 'cm' ? '27' : '10.6' },
      ]
    }
  };

  const measurementTips = [
    {
      title: 'Chest/Bust',
      description: 'Measure around the fullest part of your chest, keeping the tape horizontal.',
      icon: '📏'
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, above your hip bones.',
      icon: '⭕'
    },
    {
      title: 'Hips',
      description: 'Measure around the fullest part of your hips, about 8 inches below your waist.',
      icon: '📐'
    },
    {
      title: 'Length',
      description: 'For tops: measure from shoulder to hem. For bottoms: measure inseam from crotch to ankle.',
      icon: '📏'
    }
  ];

  const currentChart = sizeCharts[selectedCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Ruler className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your fit — size guide</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Get the perfect fit every time with our comprehensive sizing charts and measurement guide
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Category & Unit Selectors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                {Object.entries(sizeCharts).map(([key, chart]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as any)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === key
                        ? 'bg-teal-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700'
                    }`}
                    aria-pressed={selectedCategory === key}
                  >
                    {chart.title}
                  </button>
                ))}
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    unit === 'cm' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
                  }`}
                  aria-pressed={unit === 'cm'}
                >
                  CM
                </button>
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    unit === 'inches' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
                  }`}
                  aria-pressed={unit === 'inches'}
                >
                  Inches
                </button>
              </div>
            </div>

            {/* Size Chart Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                    {currentChart.headers.map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left font-semibold first:rounded-l-lg last:rounded-r-lg">
                        {header} {index > 0 && `(${unit})`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentChart.data.map((row, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-50 transition-colors duration-200`}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 0 ? 'font-bold text-teal-600' : 'text-gray-700'}`}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <User className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to Measure</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {measurementTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                💡 Pro Tips for Perfect Fit
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Measure over your undergarments for the most accurate fit</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span>If you're between sizes, we recommend sizing up for comfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Check the product description for fit notes (slim, regular, relaxed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Still unsure? Contact our support team for personalized sizing help</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
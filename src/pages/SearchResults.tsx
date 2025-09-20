import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Shirts', 'T-Shirts', 'Shorts', 'Pants'];
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const searchResults = React.useMemo(() => {
    if (!query) return [];

    let filtered = products.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // Simple relevance scoring
          const aScore = (a.name.toLowerCase().includes(query.toLowerCase()) ? 10 : 0) +
                        (a.category.toLowerCase().includes(query.toLowerCase()) ? 5 : 0);
          const bScore = (b.name.toLowerCase().includes(query.toLowerCase()) ? 10 : 0) +
                        (b.category.toLowerCase().includes(query.toLowerCase()) ? 5 : 0);
          return bScore - aScore;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [query, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Search Results
            </h1>
          </div>
          {query && (
            <p className="text-xl text-gray-600">
              Showing {searchResults.length} results for "{query}"
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters & Sort */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                        selectedCategory === category
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product, index) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <SlidersHorizontal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found for "{query}"
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse our categories
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Suggestions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['printed t-shirts', 'summer collection', 'casual wear'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => window.location.href = `/search?q=${encodeURIComponent(suggestion)}`}
                        className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm hover:bg-teal-200 transition-colors duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start your search
              </h3>
              <p className="text-gray-600">
                Enter a search term to find products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
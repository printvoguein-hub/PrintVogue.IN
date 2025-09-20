import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  relevanceScore: number;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    // Simulate API call - in real app, this would call your search API
    const filteredProducts = products
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        category: product.category,
        relevanceScore: calculateRelevance(product, searchQuery)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 8);

    setResults(filteredProducts);
    setIsLoading(false);
    setSelectedIndex(-1);
  };

  const calculateRelevance = (product: any, query: string): number => {
    const lowerQuery = query.toLowerCase();
    let score = 0;
    
    if (product.name.toLowerCase().includes(lowerQuery)) score += 10;
    if (product.category.toLowerCase().includes(lowerQuery)) score += 5;
    if (product.description.toLowerCase().includes(lowerQuery)) score += 3;
    
    return score;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        window.location.href = `/product/${results[selectedIndex].id}`;
      } else if (query.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    }
  };

  const getSpellingSuggestion = (query: string): string | null => {
    const commonMisspellings: { [key: string]: string } = {
      'tshirt': 't-shirt',
      'tee': 't-shirt',
      'pant': 'pants',
      'short': 'shorts',
      'shrit': 'shirt'
    };
    
    const lowerQuery = query.toLowerCase();
    return commonMisspellings[lowerQuery] || null;
  };

  const popularProducts = products.slice(0, 4);
  const spellingSuggestion = query.length > 2 ? getSpellingSuggestion(query) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-12 py-4 text-lg border-0 focus:ring-0 focus:outline-none"
              aria-label="Search products"
              role="searchbox"
              aria-expanded={results.length > 0}
              aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
          {isLoading && (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">No results found for "{query}"</p>
              
              {spellingSuggestion && (
                <p className="text-sm text-gray-500 mb-4">
                  Did you mean{' '}
                  <button
                    onClick={() => setQuery(spellingSuggestion)}
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    "{spellingSuggestion}"
                  </button>
                  ?
                </p>
              )}

              <div>
                <p className="text-sm text-gray-500 mb-3">Popular products:</p>
                <div className="grid grid-cols-2 gap-3">
                  {popularProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="text-sm text-gray-700 truncate">{product.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  to={`/product/${result.id}`}
                  onClick={onClose}
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedIndex === index ? 'bg-teal-50 border-l-4 border-teal-600' : ''
                  }`}
                >
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{result.name}</h3>
                    <p className="text-sm text-gray-500">{result.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{result.price.toLocaleString()}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Link>
              ))}
              
              {query && (
                <Link
                  to={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 p-4 text-teal-600 hover:bg-teal-50 transition-colors duration-200 border-t border-gray-200"
                >
                  <Search className="w-4 h-4" />
                  <span>View all results for "{query}"</span>
                </Link>
              )}
            </div>
          )}

          {!query && (
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['printed t-shirts', 'summer collection', 'custom prints', 'casual wear'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
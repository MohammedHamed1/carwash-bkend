import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

const SearchBar = ({ 
  placeholder = 'ابحث هنا...',
  onSearch,
  onClear,
  showFilters = false,
  filters = [],
  onFilterChange,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`
          relative flex items-center bg-white rounded-2xl shadow-lg border-2 transition-all duration-300
          ${isFocused ? 'border-green-500 shadow-green-100' : 'border-gray-200'}
        `}>
          {/* Search Icon */}
          <div className="absolute right-4 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          
          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pr-12 pl-4 py-4 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-lg"
            dir="rtl"
          />
          
          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute left-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Filter Button */}
          {showFilters && filters.length > 0 && (
            <button
              type="button"
              className="absolute left-12 p-1 text-gray-400 hover:text-green-500 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>
      
      {/* Filters Dropdown */}
      {showFilters && filters.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-700 mb-3">الفلاتر</h3>
            <div className="space-y-2">
              {filters.map((filter, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={filter.checked}
                    onChange={(e) => onFilterChange && onFilterChange(filter.id, e.target.checked)}
                    className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{filter.label}</span>
                  {filter.count && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {filter.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
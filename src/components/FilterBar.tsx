"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronRight, RotateCcw } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material?: string;
}

interface FilterBarProps {
  categories: { id: string; name: string }[];
  materials: { id: string; name: string }[];
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (name: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  resultsCount: number;
}

export default function FilterBar({
  categories,
  materials,
  products,
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchQuery,
  setSearchQuery,
  clearFilters,
  resultsCount,
}: FilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedMaterial ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filter products for suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    // Filter and map products with their match priority
    const matchedProducts = products
      .filter(product => product.name.toLowerCase().includes(query))
      .map(product => {
        const name = product.name;
        const nameLower = name.toLowerCase();
        const words = nameLower.split(/\s+/);

        // Determine match priority
        let priority = 999; // Default priority for matches anywhere

        // Check if query matches the start of each word
        words.forEach((word, index) => {
          if (word.startsWith(query)) {
            // Lower number = higher priority
            // 1st word = 0, 2nd word = 1, 3rd word = 2, etc.
            if (index < priority) {
              priority = index;
            }
          }
        });

        return { name, priority };
      })
      // Sort by priority (lower number first), then alphabetically
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      })
      .slice(0, 8)
      .map(item => item.name);

    return matchedProducts;
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          setSearchQuery(suggestions[selectedIndex]);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Handle input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span className="font-bold text-gold">{match}</span>
        {after}
      </>
    );
  };

  const filterContent = useMemo(() => (
    <div className="space-y-10">
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] mb-4 font-body">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent z-10" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            className="w-full pl-12 pr-4 py-4 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all placeholder:text-accent/50 text-dark"
            autoComplete="off"
          />

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-soft border border-gold/20 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto custom-scrollbar"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 transition-all duration-200 border-b border-gold/10 last:border-b-0 ${index === selectedIndex
                    ? 'bg-gold/10 text-dark'
                    : 'hover:bg-gold/5 text-dark'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-sm">
                      {highlightMatch(suggestion, searchQuery)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results message */}
          {showSuggestions && searchQuery && suggestions.length === 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-soft border border-gold/20 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 text-sm text-accent italic">
                No products found matching "{searchQuery}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Categories</h3>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory("")} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 border ${selectedCategory === cat.id
                ? "bg-gold text-soft border-gold shadow-md"
                : "bg-soft/50 text-accent border-gold/10 hover:border-gold/30"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Materials</h3>
          {selectedMaterial && (
            <button onClick={() => setSelectedMaterial("")} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(selectedMaterial === mat.name ? "" : mat.name)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 border ${selectedMaterial === mat.name
                ? "bg-gold text-soft border-gold shadow-md"
                : "bg-soft/50 text-accent border-gold/10 hover:border-gold/30"
                }`}
            >
              {mat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Price Range (LKR)</h3>
          {(minPrice || maxPrice) && (
            <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 text-xs">Min</span>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all text-sm text-dark"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 text-xs">Max</span>
            <input
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all text-sm text-dark"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-4 mt-10 bg-dark text-soft rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 shadow-lg group"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-120deg] transition-transform duration-500" />
          Reset All Filters
        </button>
      )}
    </div>
  ), [
    searchQuery,
    handleSearchChange,
    handleKeyDown,
    showSuggestions,
    suggestions,
    selectedIndex,
    handleSuggestionClick,
    highlightMatch,
    categories,
    selectedCategory,
    setSelectedCategory,
    materials,
    selectedMaterial,
    setSelectedMaterial,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    activeFiltersCount,
    clearFilters,
  ]);

  return (
    <div className="w-full mb-10">
      {/* Horizontal Bar (Desktop) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 bg-soft/50 backdrop-blur-md border border-gold/20 rounded-2xl shadow-sm">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-dark text-soft rounded-xl shadow-lg hover:bg-gold transition-all duration-300 group"
        >
          <SlidersHorizontal className="w-4 h-4 text-gold group-hover:text-soft" />
          <span className="font-bold text-sm uppercase tracking-widest">Filter & Search</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-gold text-soft text-[10px] rounded-full font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Discovery</span>
            <span className="text-dark font-heading text-lg">
              {resultsCount} <span className="text-accent font-body text-sm italic">Items found</span>
            </span>
          </div>
          <div className="h-10 w-px bg-gold/20 hidden md:block"></div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Currency</span>
            <span className="text-dark font-medium">LKR (Rs.)</span>
          </div>
        </div>
      </div>

      {/* Mobile/Side Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-dark/40 backdrop-blur-sm z-[100] transition-all duration-500 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-base shadow-3xl transform transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-8 border-b border-gold/10">
            <div>
              <h2 className="text-2xl font-heading text-dark">Refine Selection</h2>
              <p className="text-xs text-accent uppercase tracking-widest mt-1 italic">Grazie.lk Premium Filter</p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-3 bg-soft text-dark hover:bg-gold hover:text-soft transition-all rounded-full shadow-inner"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {filterContent}
          </div>

          {/* Drawer Footer */}
          <div className="p-8 border-t border-gold/10 bg-soft/30">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-5 bg-gold text-soft rounded-xl font-bold font-heading text-lg shadow-xl hover:bg-dark transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              Show {resultsCount} Items
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

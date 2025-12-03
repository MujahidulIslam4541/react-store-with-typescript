import React, { createContext, useState, type ReactNode } from 'react';

// Context-data type
interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;

  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;

  keyword: string;
  setKeyWord: (keyword: string) => void;
}

// create context
// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

// Provider Component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyWord] = useState<string>('');

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyWord,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

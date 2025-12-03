import { useEffect, useState } from "react";
import { useFilter } from "./useFilter";

// Product type
interface Product {
  category: string;
}

// Fetch response type
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  // Filter context state
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyWord
  } = useFilter();

  // Local state
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "shoes",
    "fashion",
    "shirt"
  ]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        // Get unique categories
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );

        console.log(data); // Debug: see the API data
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handlers
  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClickedKeyWord = (keyword: string) => {
    setKeyWord(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyWord("");
  };

  return (
    <div className="w-64 p-5 shadow h-screen">
      {/* Heading */}
      <h2 className="text-xl font-bold text-center">React Store</h2>

      {/* Search & Price Filter */}
      <section className="mt-4">
        <input
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 px-2 border-gray-500 w-full rounded"
        />

        <div className="flex justify-center items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="border-2 border-gray-500 rounded w-full px-2"
          />
          <input
            type="text"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="border-2 border-gray-500 rounded w-full px-2"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Categories</h2>

        {categories.map((category, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={() => handleRadioChangeCategories(category)}
              checked={selectedCategory === category}
              className="mr-2 w-4 h-4"
            />
            {category.toUpperCase()}
          </label>
        ))}
      </section>

      {/* Keywords */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Keywords</h2>

        {keywords.map((kw, index) => (
          <button
            key={index}
            onClick={() => handleClickedKeyWord(kw)}
            className="block mb-2 px-4 py-1 w-full rounded border-2 hover:bg-gray-200 transition-all"
          >
            {kw.toUpperCase()}
          </button>
        ))}
      </section>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="mb-4 mt-10 bg-black text-white w-full border-2 px-4 py-1 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

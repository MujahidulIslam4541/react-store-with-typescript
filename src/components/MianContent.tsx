import { useEffect, useState } from 'react';
import { useFilter } from './useFilter';
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = '';

    // Calculate skip value correctly
    const skip = (currentPage - 1) * itemsPerPage;

    // Default products fetch
    url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

    // If keyword is selected → search API
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        console.log('Fetched products:', response.data.products);
      })
      .catch((error) => {
        console.error('Data fetching error:', error);
      });
  }, [currentPage, keyword]);

  const getFilterProducts = () => {
    let filterProducts = products;

    if (selectedCategory) {
      filterProducts = filterProducts.filter(
        (product) => product.category === selectedCategory,
      );

      console.log(filterProducts);
    }

    if (minPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price >= minPrice,
      );
    }

    if (maxPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
      );
    }

    switch (filter) {
      case 'expensive':
        return filterProducts.sort((a, b) => b.price - a.price);
      case 'cheap':
        return filterProducts.sort((a, b) => a.price - b.price);
      case 'popular':
        return filterProducts.sort((a, b) => a.rating - b.rating);
      default:
        return filterProducts;
    }
  };

  const filterProducts = getFilterProducts();
  console.log(filterProducts);

  return (
    <section>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative my-5 ml-10">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />
              {filter === 'all'
                ? 'Filter'
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40 shadow">
                <button
                  onClick={() => setFilter('cheap')}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter('expensive')}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter('popular')}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-10">
          {filterProducts.map((product) => (
            <BookCard
              key={product}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            ></BookCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;

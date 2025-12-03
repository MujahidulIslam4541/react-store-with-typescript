import { useState } from 'react';
import { useFilter } from './useFilter';
import { Tally3 } from 'lucide-react';

const MianContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilter();

  const [product, setProduct] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative my-5 ml-10">
            <button className=" border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2"></Tally3>

              {filter === 'all'
                ? 'Filter'
                : filter.charAt(0).toLocaleLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bgh-white border border-gray-300 rounded mt-2 w-full sm:w-40">
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
      </div>
    </section>
  );
};

export default MianContent;

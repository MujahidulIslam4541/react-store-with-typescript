import { useEffect, useState } from "react";
import { useFilter } from "./useFilter";
import { ShoppingCart, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "@/components/BookCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cart";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    let url = "";
    const skip = (currentPage - 1) * itemsPerPage;
    url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;
    if (keyword) url = `https://dummyjson.com/products/search?q=${keyword}`;

    axios.get(url).then(res => setProducts(res.data.products)).catch(console.error);
  }, [currentPage, keyword]);

  const getFilterProducts = () => {
    let filtered = products;
    if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
    if (minPrice !== undefined) filtered = filtered.filter(p => p.price >= minPrice);
    if (maxPrice !== undefined) filtered = filtered.filter(p => p.price <= maxPrice);
    if (searchQuery) filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    switch (filter) {
      case "expensive": return filtered.sort((a, b) => b.price - a.price);
      case "cheap": return filtered.sort((a, b) => a.price - b.price);
      case "popular": return filtered.sort((a, b) => b.rating - a.rating);
      default: return filtered;
    }
  };

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const filterProductsList = getFilterProducts();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) buttons.push(i);
    return buttons;
  };

  return (
    <section>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Filter dropdown */}
          <div className="relative my-5 ml-10">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />
              {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded mt-2 w-full sm:w-40 shadow">
                <button onClick={() => setFilter("cheap")} className="block px-4 py-2 w-full hover:bg-gray-200">Cheap</button>
                <button onClick={() => setFilter("expensive")} className="block px-4 py-2 w-full hover:bg-gray-200">Expensive</button>
                <button onClick={() => setFilter("popular")} className="block px-4 py-2 w-full hover:bg-gray-200">Popular</button>
              </div>
            )}
          </div>

          {/* Cart badge */}
          <div className="relative">
            <Link to='/addToCart'>
              <ShoppingCart className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-10">
          {filterProductsList.map(product => (
            <BookCard
              key={product.id.toString()}
              id={product.id.toString()}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
              onAddToCart={() => dispatch(addToCart({
                id: product.id.toString(),
                title: product.title,
                price: product.price,
                image: product.thumbnail
              }))}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="border px-2 py-2 mx-2 rounded-full">Previous</button>
          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map(page => (
              <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}>{page}</button>
            ))}
          </div>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border px-2 py-2 mx-2 rounded-full">Next</button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

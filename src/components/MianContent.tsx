import { useEffect, useState } from "react";
import { useFilter } from "./useFilter";
import { ShoppingCart, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

// redux imports
// import { useDispatch, useSelector } from "react-redux";
// import { incrementWishlist } from "../redux/Wishlist";
// import type { RootState } from "../redux/store";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addCart, setAddCart] = useState(0);
  const itemsPerPage = 12;

  // REDUX WISHLIST STATE
  // const dispatch = useDispatch();
  // const wishlist = useSelector((state: RootState) => state.wishlist.count);

  useEffect(() => {
    let url = "";
    const skip = (currentPage - 1) * itemsPerPage;

    url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Data fetching error:", error);
      });
  }, [currentPage, keyword]);

  const getFilterProducts = () => {
    let filterProducts = products;

    if (selectedCategory) {
      filterProducts = filterProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filterProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filterProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filterProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filterProducts;
    }
  };

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const filterProductsList = getFilterProducts();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPeginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <section>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* filter dropdown */}
          <div className="relative my-5 ml-10">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border rounded mt-2 w-full sm:w-40 shadow">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon Badge */}
          <div className="relative">
            <Link to='/addToCart'>
              <ShoppingCart className="w-8 h-8" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {addCart}
              </span>
            </Link>
          </div>
        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-10">
          {filterProductsList.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
              onaddToCart={() => setAddCart(addCart + 1)}
            />
          ))}
        </div>

        {/* pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-2 py-2 mx-2 rounded-full"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPeginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-2 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MianContent from "./components/MianContent";
import { ProductPage } from "./components/ProductPage";
import TopSeller from "./components/TopSeller";
import PopularBlogs from "./components/PopularBolgs";
import AddToCart from "./components/CartTable";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen max-w-7x mx-auto">
        <Sidebar />

        <div className="flex justify-between flex-wrap rounded w-full">
          <Routes>
            <Route path="/" element={<MianContent></MianContent>}></Route>
            <Route
              path="/product/:id"
              element={<ProductPage></ProductPage>}
            ></Route>
          </Routes>

          <Routes>
            <Route path="/addToCart" element={<AddToCart></AddToCart>}></Route>
          </Routes>

          <div>
            <TopSeller></TopSeller>
            <PopularBlogs></PopularBlogs>
          </div>
        </div>
      </div>
    </Router>
  );
}

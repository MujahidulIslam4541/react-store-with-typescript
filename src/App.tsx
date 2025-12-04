import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MianContent from "./components/MianContent";
import { ProductPage } from "./components/ProductPage";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen max-w-7x mx-auto">
        <Sidebar />

        <div className="flex justify-between flex-wrap rounded w-full">
          <Routes>
            <Route path="/" element={<MianContent></MianContent>}></Route>
            <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

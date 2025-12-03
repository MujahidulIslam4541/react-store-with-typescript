import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MianContent from "./components/MianContent";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex justify-between flex-wrap rounded w-full">
          <Routes>
            <Route path="/" element={<MianContent></MianContent>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

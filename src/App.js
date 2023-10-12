import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ListProduct from "./components/ListProduct";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className=" flex py-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700 via-purple-800 to-gray-900">
          <ul className="flex flex-row mx-auto gap-10">
            <li>
              <Link
                className=" hover:text-gray-100 text-slate-200 text-xl font-bold transition-colors"
                to="/"
              >
                List Products
              </Link>
            </li>
            <li>
              <Link
                className=" hover:text-gray-100 text-slate-200 text-xl font-bold transition-colors"
                to="/product/create"
              >
                Create Product
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListProduct />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/:id/edit" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

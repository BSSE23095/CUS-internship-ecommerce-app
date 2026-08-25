import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import PlaceOrders from "./pages/PlaceOrders";
import Product from "./pages/Product";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Policy from "./pages/Policy";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ShopContextProvider from "./context/ShopContext";
import AdminLogin from "./pages/Adminlogin";
import AdminProductList from "./pages/AdminProductList";
import AdminAddProduct from "./pages/AdminAddProduct";

function App() {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
        </Routes>
        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default App;

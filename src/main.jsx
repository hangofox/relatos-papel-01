import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './home/Home'
import { Search } from "./search/Search";
import { ShoppingCart } from "./shopping-cart/ShoppingCart";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Layout from "./components/Layout.jsx";
import Checkout from "./pages/Checkout.jsx";
import BookingConfirmed from "./pages/BookingConfirmed.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/experience/:id" element={<Detail />} />
          <Route path="/checkout/:experienceId" element={<Checkout />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

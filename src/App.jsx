import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { BookingProvider } from "./context/BookingContext";

import Home from "./pages/Home";
// Secondary pages load on demand so the homepage bundle stays small
const Gallery = lazy(() => import("./pages/Gallery"));
const CategoryGallery = lazy(() => import("./pages/CategoryGallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function AppContent() {

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content-flow">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:category" element={<CategoryGallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </Router>
  );
}

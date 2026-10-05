import React, { createContext, useContext, useState } from "react";
import BookingModal from "../components/BookingModal";

const BookingContext = createContext({
  openBookingModal: () => {},
  closeBookingModal: () => {}
});

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState("wedding");

  const openBookingModal = (category = "wedding") => {
    setInitialCategory(category);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      <BookingModal 
        isOpen={isOpen} 
        onClose={closeBookingModal} 
        initialCategory={initialCategory} 
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}

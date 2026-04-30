import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Rezervare } from '../types/booking';

interface BookingsContextValue {
  bookings: Rezervare[];
  addBooking: (booking: Rezervare) => void;
  getBookingsByUser: (email: string) => Rezervare[];
}

const BookingsContext = createContext<BookingsContextValue | null>(null);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Rezervare[]>([]);

  const addBooking = useCallback((booking: Rezervare) => {
    setBookings((prev) => [booking, ...prev]);
  }, []);

  const getBookingsByUser = useCallback(
    (_email: string) => bookings,
    [bookings]
  );

  const value: BookingsContextValue = {
    bookings,
    addBooking,
    getBookingsByUser,
  };

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
};

export const useStoreBookings = (): BookingsContextValue => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useStoreBookings must be used within a BookingsProvider');
  }
  return context;
};

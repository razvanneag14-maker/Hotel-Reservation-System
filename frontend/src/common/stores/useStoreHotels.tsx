import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Hotel } from '../types/hotel';
import { MOCK_HOTELS } from '../constants/mockData';
import { generateId } from '../../utils/formatters';

interface HotelsContextValue {
  hotels: Hotel[];
  getHotelById: (id: string) => Hotel | undefined;
  addHotel: (hotel: Omit<Hotel, 'id'>) => Hotel;
  updateHotel: (id: string, updates: Partial<Hotel>) => boolean;
  deleteHotel: (id: string) => boolean;
}

const HotelsContext = createContext<HotelsContextValue | null>(null);

export const HotelsProvider = ({ children }: { children: ReactNode }) => {
  const [hotels, setHotels] = useState<Hotel[]>([...MOCK_HOTELS]);

  const getHotelById = useCallback(
    (id: string) => hotels.find((h) => h.id === id),
    [hotels]
  );

  const addHotel = useCallback((hotelData: Omit<Hotel, 'id'>): Hotel => {
    const newHotel: Hotel = { ...hotelData, id: generateId() };
    setHotels((prev) => [newHotel, ...prev]);
    return newHotel;
  }, []);

  const updateHotel = useCallback((id: string, updates: Partial<Hotel>): boolean => {
    let found = false;
    setHotels((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          found = true;
          return { ...h, ...updates };
        }
        return h;
      })
    );
    return found;
  }, []);

  const deleteHotel = useCallback((id: string): boolean => {
    let found = false;
    setHotels((prev) => {
      const filtered = prev.filter((h) => {
        if (h.id === id) {
          found = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    return found;
  }, []);

  const value: HotelsContextValue = {
    hotels,
    getHotelById,
    addHotel,
    updateHotel,
    deleteHotel,
  };

  return <HotelsContext.Provider value={value}>{children}</HotelsContext.Provider>;
};

export const useStoreHotels = (): HotelsContextValue => {
  const context = useContext(HotelsContext);
  if (!context) {
    throw new Error('useStoreHotels must be used within a HotelsProvider');
  }
  return context;
};

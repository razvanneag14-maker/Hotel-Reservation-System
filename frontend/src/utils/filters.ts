import type { Hotel } from '../common/types/hotel';
import { TipCamera } from '../common/types/hotel';
import { getLowestPrice } from './formatters';

export interface FilterState {
  searchQuery: string;
  stars: number[];
  priceMin: number;
  priceMax: number;
  roomTypes: TipCamera[];
  mealPlan: ('allInclusive' | 'justBreakfast')[];
  facilities: string[];
  maxDistanceBeach: number;
  maxDistanceCity: number;
  showAvailableOnly: boolean;
  status: string[];
  checkInDate: string;
  checkOutDate: string;
}

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  stars: [],
  priceMin: 0,
  priceMax: 1000,
  roomTypes: [],
  mealPlan: [],
  facilities: [],
  maxDistanceBeach: 10000,
  maxDistanceCity: 10000,
  showAvailableOnly: false,
  status: [],
  checkInDate: '',
  checkOutDate: '',
};

export const applyFilters = (hotels: Hotel[], filters: FilterState): Hotel[] => {
  return hotels.filter((hotel) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matches =
        hotel.name.toLowerCase().includes(q) ||
        hotel.locatie.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (filters.stars.length > 0 && !filters.stars.includes(hotel.stele)) {
      return false;
    }

    const lowestPrice = getLowestPrice(hotel.camere);
    if (lowestPrice < filters.priceMin || lowestPrice > filters.priceMax) {
      return false;
    }

    if (filters.roomTypes.length > 0) {
      const hotelRoomTypes = hotel.camere.map((c) => c.tip);
      const hasMatchingRoom = filters.roomTypes.some((t) => hotelRoomTypes.includes(t));
      if (!hasMatchingRoom) return false;
    }

    if (filters.mealPlan.length > 0) {
      const matchesMeal = filters.mealPlan.some((plan) => {
        if (plan === 'allInclusive') return hotel.allInclusive;
        if (plan === 'justBreakfast') return hotel.justBreakfast;
        return false;
      });
      if (!matchesMeal) return false;
    }

    if (filters.facilities.length > 0) {
      const hasAllFacilities = filters.facilities.every((f) =>
        hotel.facilitati.includes(f)
      );
      if (!hasAllFacilities) return false;
    }

    if (filters.maxDistanceBeach < 10000) {
      if (hotel.metri_de_plaja === 0 || hotel.metri_de_plaja > filters.maxDistanceBeach) {
        return false;
      }
    }

    if (filters.maxDistanceCity < 10000) {
      if (hotel.metri_de_centrul_orasului > filters.maxDistanceCity) {
        return false;
      }
    }

    if (filters.showAvailableOnly) {
      const hasAvailable = hotel.camere.some((c) => c.disponibilitate);
      if (!hasAvailable) return false;
    }

    if (filters.checkInDate && filters.checkOutDate) {
      const isOpen = hotel.status === 'DESCHIS';
      const hasAvailableRoom = hotel.camere.some((c) => c.disponibilitate);
      if (!isOpen || !hasAvailableRoom) return false;
    }

    if (filters.status.length > 0 && !filters.status.includes(hotel.status)) {
      return false;
    }

    return true;
  });
};

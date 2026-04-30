export const formatPrice = (price: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDistance = (meters: number): string => {
  if (meters === 0) return 'N/A';
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
};

export const getLowestPrice = (camere: { pretPerNoapte: number }[]): number => {
  if (camere.length === 0) return 0;
  return Math.min(...camere.map((c) => c.pretPerNoapte));
};

export const getHighestPrice = (camere: { pretPerNoapte: number }[]): number => {
  if (camere.length === 0) return 0;
  return Math.max(...camere.map((c) => c.pretPerNoapte));
};

export const formatStatus = (status: string): string => {
  const map: Record<string, string> = {
    DESCHIS: 'Open',
    IN_RENOVARE: 'Under Renovation',
    INCHIS_TEMPORAR: 'Temporarily Closed',
    INCHIS_PERMANENT: 'Permanently Closed',
    INDISPONIBIL_PENTRU_REZERVARI: 'Not Accepting Reservations',
  };
  return map[status] || status;
};

export const formatRoomType = (tip: string): string => {
  const map: Record<string, string> = {
    SINGLE: 'Single Room',
    DOUBLE: 'Double Room',
    SUITE: 'Suite',
    FAMILY: 'Family Room',
  };
  return map[tip] || tip;
};

export const generateId = (): string => {
  return 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
};

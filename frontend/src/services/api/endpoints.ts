// Base Configuration
export const backendUrl: string = 'https://localhost:7000'; // Change to your C# API port

// Auth Endpoints
export const signInEndpoint = '/api/v1/auth/signin';
export const signUpEndpoint = '/api/v1/auth/signup';
export const welcomeEndpoint = '/api/v1/welcome';

export const getHotelListEndpoint = '/api/v1/hotels';
export const searchHotelsEndpoint = (location: string) => 
    `/api/v1/hotels/search/${location}`; 
export const getHotelDetailsEndpoint = (hotelId: string) => 
    `/api/v1/hotels/${hotelId}`;
export const updateHotelStatusEndpoint = (hotelId: string) => 
    `/api/v1/hotels/${hotelId}/status`; // Administrator.cs 

// Camera Endpoints (Matches Camera.cs)
export const getRoomListEndpoint = (hotelId: string) => 
    `/api/v1/hotels/${hotelId}/rooms`;
export const checkRoomAvailabilityEndpoint = (roomId: string) => 
    `/api/v1/rooms/${roomId}/availability`; // Sequence Diagram Step 2

// Booking & Client Endpoints (Matches Rezervare.cs & Client.cs)
export const createBookingEndpoint = '/api/v1/reservations';
export const getClientReservationsEndpoint = (email: string) => 
    `/api/v1/client/${email}/reservations`;
export const cancelBookingEndpoint = (reservationId: string) => 
    `/api/v1/reservations/${reservationId}/cancel`;

// Admin Specific Endpoints (Matches Administrator.cs)
export const adminNotifyEndpoint = '/api/v1/admin/notify'; 
export const getAdminHotelReservationsEndpoint = (hotelId: string) => 
    `/api/v1/admin/hotels/${hotelId}/reservations`;
import { Hotel, StatusHotel, TipCamera } from '../types/hotel';
import type { AuthUser } from '../types/users';


export const MOCK_ADMIN_CREDENTIALS = {
  email: 'admin@hotel.com',
  password: 'admin123',
};

export const MOCK_ADMIN_USER: AuthUser = {
  email: 'admin@hotel.com',
  name: 'Admin Hotel Manager',
  role: 'admin',
};


export const MOCK_GUEST_CREDENTIALS = {
  email: 'user@hotel.com',
  password: 'user123',
};

export const MOCK_GUEST_USER: AuthUser = {
  email: 'user@hotel.com',
  name: 'Maria Popescu',
  role: 'guest',
};


export const ALL_FACILITIES = [
  'Pool', 'Private Beach', 'Spa', 'Gym', 'Restaurant',
  'Bar', 'WiFi', 'Parking', 'Room Service', 'Sauna',
  'Ski Storage', 'Fireplace', 'Business Center', 'Coffee Shop',
  'Boat Rental', 'Fishing Gear', 'Laundry', 'Airport Shuttle',
  'Pet Friendly', 'Kids Club',
] as const;


export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Grand Mamaia Resort & Spa',
    locatie: 'Mamaia, Constanta',
    imagine: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    facilitati: ['Pool', 'Private Beach', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Parking', 'Room Service'],
    allInclusive: true,
    justBreakfast: false,
    stele: 5,
    metri_de_plaja: 50,
    metri_de_centrul_orasului: 2000,
    metri_de_atractii_turistice: 500,
    status: StatusHotel.DESCHIS,
    descriere: 'Luxury beachfront resort in Mamaia with stunning Black Sea views, world-class spa facilities, and multiple dining options. Perfect for both relaxation and adventure seekers.',
    camere: [
      { etaj: 1, numar: 101, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['TV', 'AC', 'Mini-bar', 'Sea View'], pretPerNoapte: 250 },
      { etaj: 2, numar: 202, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ['Mini-bar', 'Balcony', 'Jacuzzi', 'Sea View'], pretPerNoapte: 450 },
      { etaj: 3, numar: 301, tip: TipCamera.FAMILY, disponibilitate: true, facilitati: ['TV', 'AC', 'Kitchenette', 'Balcony'], pretPerNoapte: 380 },
      { etaj: 1, numar: 105, tip: TipCamera.SINGLE, disponibilitate: false, facilitati: ['TV', 'AC', 'WiFi'], pretPerNoapte: 150 },
    ],
  },
  {
    id: 'h2',
    name: 'Hotel Carpati Mountain Lodge',
    locatie: 'Poiana Brasov, Brasov',
    imagine: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    facilitati: ['Ski Storage', 'Sauna', 'Fireplace', 'Restaurant', 'WiFi', 'Parking'],
    allInclusive: false,
    justBreakfast: true,
    stele: 4,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 500,
    metri_de_atractii_turistice: 100,
    status: StatusHotel.DESCHIS,
    descriere: 'Charming mountain lodge nestled in the heart of Poiana Brasov. Ideal base for skiing adventures in winter and hiking in summer. Traditional Romanian hospitality at its finest.',
    camere: [
      { etaj: 3, numar: 305, tip: TipCamera.SINGLE, disponibilitate: true, facilitati: ['Heating', 'Mountain View', 'WiFi'], pretPerNoapte: 120 },
      { etaj: 3, numar: 306, tip: TipCamera.DOUBLE, disponibilitate: false, facilitati: ['Heating', 'WiFi', 'Fireplace'], pretPerNoapte: 200 },
      { etaj: 2, numar: 210, tip: TipCamera.FAMILY, disponibilitate: true, facilitati: ['Heating', 'Mountain View', 'Kitchenette'], pretPerNoapte: 320 },
    ],
  },
  {
    id: 'h3',
    name: 'City Center Boutique Hotel',
    locatie: 'Cluj-Napoca, Cluj',
    imagine: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    facilitati: ['Gym', 'Business Center', 'Coffee Shop', 'WiFi', 'Laundry', 'Room Service'],
    allInclusive: false,
    justBreakfast: true,
    stele: 4,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 0,
    metri_de_atractii_turistice: 200,
    status: StatusHotel.DESCHIS,
    descriere: 'Modern boutique hotel in the heart of Cluj-Napoca, steps away from the main square. Combines contemporary design with the historic charm of Transylvania\'s cultural capital.',
    camere: [
      { etaj: 1, numar: 10, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ['Kitchenette', 'Workspace', 'Smart TV', 'City View'], pretPerNoapte: 350 },
      { etaj: 2, numar: 21, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['TV', 'AC', 'WiFi'], pretPerNoapte: 180 },
    ],
  },
  {
    id: 'h4',
    name: 'Vila Delta Wilderness Retreat',
    locatie: 'Tulcea, Tulcea',
    imagine: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    facilitati: ['Boat Rental', 'Fishing Gear', 'Restaurant', 'WiFi'],
    allInclusive: false,
    justBreakfast: false,
    stele: 3,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 5000,
    metri_de_atractii_turistice: 50,
    status: StatusHotel.DESCHIS,
    descriere: 'A peaceful retreat in the Danube Delta, surrounded by untouched nature and wildlife. Experience the unique ecosystem with guided boat tours and fishing expeditions.',
    camere: [
      { etaj: 0, numar: 1, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['Mosquito Net', 'River View', 'Fan'], pretPerNoapte: 95 },
      { etaj: 0, numar: 2, tip: TipCamera.SINGLE, disponibilitate: true, facilitati: ['Mosquito Net', 'Fan'], pretPerNoapte: 65 },
      { etaj: 1, numar: 3, tip: TipCamera.DOUBLE, disponibilitate: false, facilitati: ['River View', 'AC', 'Balcony'], pretPerNoapte: 130 },
    ],
  },
  {
    id: 'h5',
    name: 'Therme Palace Hotel',
    locatie: 'Baile Felix, Bihor',
    imagine: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    facilitati: ['Spa', 'Pool', 'Sauna', 'Restaurant', 'Bar', 'Parking', 'Room Service', 'Gym'],
    allInclusive: true,
    justBreakfast: false,
    stele: 5,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 3000,
    metri_de_atractii_turistice: 300,
    status: StatusHotel.DESCHIS,
    descriere: 'Premier thermal spa hotel featuring natural hot spring pools and comprehensive wellness programs. All-inclusive packages include unlimited spa access and gourmet dining.',
    camere: [
      { etaj: 1, numar: 110, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ['Private Pool', 'Jacuzzi', 'Balcony', 'Mini-bar'], pretPerNoapte: 520 },
      { etaj: 2, numar: 215, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['TV', 'AC', 'Garden View'], pretPerNoapte: 280 },
      { etaj: 3, numar: 320, tip: TipCamera.FAMILY, disponibilitate: true, facilitati: ['Kitchenette', 'TV', 'AC', 'Balcony'], pretPerNoapte: 400 },
      { etaj: 1, numar: 115, tip: TipCamera.SINGLE, disponibilitate: true, facilitati: ['TV', 'AC'], pretPerNoapte: 180 },
    ],
  },
  {
    id: 'h6',
    name: 'Hotel Negrescu Heritage',
    locatie: 'Bucharest, Ilfov',
    imagine: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    facilitati: ['Restaurant', 'Bar', 'Business Center', 'WiFi', 'Parking', 'Airport Shuttle', 'Laundry', 'Room Service'],
    allInclusive: false,
    justBreakfast: true,
    stele: 4,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 100,
    metri_de_atractii_turistice: 50,
    status: StatusHotel.DESCHIS,
    descriere: 'Elegant heritage hotel in the heart of Bucharest, blending Belle Époque architecture with modern luxury. Walking distance to major landmarks and business districts.',
    camere: [
      { etaj: 4, numar: 401, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ['City View', 'Jacuzzi', 'Mini-bar', 'Workspace'], pretPerNoapte: 380 },
      { etaj: 2, numar: 204, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['TV', 'AC', 'WiFi'], pretPerNoapte: 200 },
      { etaj: 1, numar: 102, tip: TipCamera.SINGLE, disponibilitate: false, facilitati: ['TV', 'AC'], pretPerNoapte: 130 },
    ],
  },
  {
    id: 'h7',
    name: 'Pensiunea Rustica',
    locatie: 'Sibiu, Sibiu',
    imagine: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    facilitati: ['Restaurant', 'Fireplace', 'Parking', 'WiFi', 'Pet Friendly'],
    allInclusive: false,
    justBreakfast: true,
    stele: 3,
    metri_de_plaja: 0,
    metri_de_centrul_orasului: 800,
    metri_de_atractii_turistice: 150,
    status: StatusHotel.IN_RENOVARE,
    descriere: 'Traditional Transylvanian guesthouse offering authentic Romanian cuisine and warm hospitality. Currently undergoing renovations to enhance guest comfort while preserving its rustic charm.',
    camere: [
      { etaj: 1, numar: 11, tip: TipCamera.DOUBLE, disponibilitate: false, facilitati: ['Heating', 'Garden View'], pretPerNoapte: 85 },
      { etaj: 1, numar: 12, tip: TipCamera.DOUBLE, disponibilitate: false, facilitati: ['Heating', 'Mountain View'], pretPerNoapte: 95 },
    ],
  },
  {
    id: 'h8',
    name: 'Sunset Beach Resort',
    locatie: 'Vama Veche, Constanta',
    imagine: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    facilitati: ['Private Beach', 'Bar', 'WiFi', 'Parking', 'Pool', 'Kids Club'],
    allInclusive: true,
    justBreakfast: false,
    stele: 4,
    metri_de_plaja: 20,
    metri_de_centrul_orasului: 1000,
    metri_de_atractii_turistice: 400,
    status: StatusHotel.DESCHIS,
    descriere: 'Vibrant beachfront resort in the bohemian village of Vama Veche. All-inclusive packages with beach access, pools, and entertainment for all ages.',
    camere: [
      { etaj: 1, numar: 1, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ['Sea View', 'AC', 'Balcony'], pretPerNoapte: 220 },
      { etaj: 1, numar: 2, tip: TipCamera.FAMILY, disponibilitate: true, facilitati: ['Sea View', 'AC', 'Kitchenette', 'Balcony'], pretPerNoapte: 340 },
      { etaj: 2, numar: 5, tip: TipCamera.SINGLE, disponibilitate: true, facilitati: ['AC', 'WiFi'], pretPerNoapte: 140 },
    ],
  },
];

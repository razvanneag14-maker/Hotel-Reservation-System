import { Hotel, StatusHotel, TipCamera } from '../../types/hotel';

const MOCK_HOTELS: Hotel[] = [
    {
        locatie: "Mamaia Resort",
        facilitati: "Pool, Private Beach, Spa",
        allInclusive: true,
        justBreakfast: false,
        stele: 5,
        metri_de_plaja: 50,
        metri_de_centrul_orasului: 2000,
        metri_de_atractii_turistice: 500,
        status: StatusHotel.DESCHIS,
        camere: [
            { etaj: 1, numar: 101, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ["TV", "AC"] },
            { etaj: 2, numar: 202, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ["Mini-bar", "Balcony"] }
        ]
    },
    {
        locatie: "Hotel Carpati - Poiana Brasov",
        facilitati: "Ski Storage, Sauna, Fireplace",
        allInclusive: false,
        justBreakfast: true,
        stele: 4,
        metri_de_plaja: 0,
        metri_de_centrul_orasului: 500,
        metri_de_atractii_turistice: 100,
        status: StatusHotel.DESCHIS,
        camere: [
            { etaj: 3, numar: 305, tip: TipCamera.SINGLE, disponibilitate: true, facilitati: ["Heating", "Mountain View"] },
            { etaj: 3, numar: 306, tip: TipCamera.DOUBLE, disponibilitate: false, facilitati: ["Heating", "WiFi"] }
        ]
    },
    {
        locatie: "City Center Boutique - Cluj",
        facilitati: "Gym, Business Center, Coffee Shop",
        allInclusive: false,
        justBreakfast: true,
        stele: 4,
        metri_de_plaja: 0,
        metri_de_centrul_orasului: 0,
        metri_de_atractii_turistice: 200,
        status: StatusHotel.DESCHIS,
        camere: [
            { etaj: 1, numar: 10, tip: TipCamera.SUITE, disponibilitate: true, facilitati: ["Kitchenette", "Workspace"] }
        ]
    },
    {
        locatie: "Vila Delta - Tulcea",
        facilitati: "Boat Rental, Fishing Gear",
        allInclusive: false,
        justBreakfast: false,
        stele: 3,
        metri_de_plaja: 0,
        metri_de_centrul_orasului: 5000,
        metri_de_atractii_turistice: 50,
        status: StatusHotel.DESCHIS,
        camere: [
            { etaj: 0, numar: 1, tip: TipCamera.DOUBLE, disponibilitate: true, facilitati: ["Mosquito Net", "River View"] }
        ]
    }
];

export const HotelApiService = {
    getHotels: async (): Promise<Hotel[]> => {
        return new Promise((resolve) => {
            // Simulate a short network delay for the Step 1 search response
            setTimeout(() => resolve(MOCK_HOTELS), 300);
        });
    }
};
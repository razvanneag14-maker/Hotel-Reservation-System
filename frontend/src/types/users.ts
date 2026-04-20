import type { Hotel } from './hotel';
import type { Rezervare } from './booking';

export interface Client {
    varsta: number;
    email: string;
    nrTelefon: string;
    rezervari: Rezervare[];
}

export interface Administrator {
    id_Administrator: number;
    name: string;
    email: string;
    telefon: number;
    hoteluri: Hotel[];
}
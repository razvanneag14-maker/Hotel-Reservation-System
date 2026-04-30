import type { Camera } from "./hotel";

export enum TipPlata {
    CARD_CREDIT = "CARD_CREDIT",
    CARD_DEBIT = "CARD_DEBIT",
    CASH = "CASH",
    TRANSFER_BANCAR = "TRANSFER_BANCAR",
    PLATA_ONLINE = "PLATA_ONLINE",
    VOUCHER = "VOUCHER"
}

export interface Plata {
    suma: number;
    tip: TipPlata;
}

export interface Rezervare {
    dataCheckIn: string;
    dataCheckOut: string;
    status: string;
    pretTotal: number;
    cameraRezervata: Camera;
    detaliiPlata?: Plata;
}

export interface Recenzie {
    data: string;
    rating: number;
    comentariu: string;
}

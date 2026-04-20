export enum StatusHotel {
    DESCHIS = "DESCHIS",
    IN_RENOVARE = "IN_RENOVARE",
    INCHIS_TEMPORAR = "INCHIS_TEMPORAR",
    INCHIS_PERMANENT = "INCHIS_PERMANENT",
    INDISPONIBIL_PENTRU_REZERVARI = "INDISPONIBIL_PENTRU_REZERVARI"
}

export enum TipCamera {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    SUITE = "SUITE",
    FAMILY = "FAMILY"
}

export interface Camera {
    etaj: number;
    numar: number;
    tip: TipCamera;
    disponibilitate: boolean;
    facilitati: string[];
}

export interface Hotel {
    locatie: string;
    facilitati: string;
    allInclusive: boolean;
    justBreakfast: boolean;
    stele: number;
    metri_de_plaja: number;
    metri_de_centrul_orasului: number;
    metri_de_atractii_turistice: number;
    status: StatusHotel;
    camere: Camera[];
}
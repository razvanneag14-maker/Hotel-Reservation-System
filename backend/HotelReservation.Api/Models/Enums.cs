namespace HotelReservation.Api.Models;

public enum StatusHotel
{
    Deschis,
    InRenovare,
    InchisTemporar,
    InchisPermanent,
    IndisponibilPentruRezervari
}

public enum TipCamera
{
    Single,
    Double,
    Suite,
    Apartament,
    Family
}

public enum TipPlata
{
    Cash,
    Card,
    Voucher
}

public enum StatusRezervare
{
    InAsteptare,
    Confirmata,
    Anulata
}

public enum UserRole
{
    Client,
    Administrator
}

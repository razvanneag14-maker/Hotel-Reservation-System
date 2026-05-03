using HotelReservation.Api.Models;

namespace HotelReservation.Api.DTOs;

public class CameraDto
{
    public int Id { get; set; }
    public int Numar { get; set; }
    public int Etaj { get; set; }
    public TipCamera TipCamera { get; set; }
    public bool Disponibila { get; set; }
    public decimal PretPeNoapte { get; set; }
    public string DescriereOferta { get; set; } = string.Empty;
}

public class HotelDto
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Destinatie { get; set; } = string.Empty;
    public string Locatie { get; set; } = string.Empty;
    public string Descriere { get; set; } = string.Empty;
    public string Facilitati { get; set; } = string.Empty;
    public string TipMasa { get; set; } = string.Empty;
    public string TipUnitate { get; set; } = string.Empty;
    public string CategorieOferta { get; set; } = string.Empty;
    public string ImagineUrl { get; set; } = string.Empty;
    public decimal Scor { get; set; }
    public int NumarComentarii { get; set; }
    public int Stele { get; set; }
    public int MetriDePlaja { get; set; }
    public StatusHotel Status { get; set; }
    public List<CameraDto> Camere { get; set; } = new();
}

public class HotelSearchDto
{
    public string? Destinatie { get; set; }
    public string? NumeHotel { get; set; }
    public DateTime? Data { get; set; }
    public int? Nopti { get; set; }
    public int? Adulti { get; set; }
    public int? Copii { get; set; }
    public string? Transport { get; set; }
    public string? Masa { get; set; }
    public int? Stele { get; set; }
    public string? Facilitati { get; set; }
    public string? CategorieOferta { get; set; }
    public string? TipUnitate { get; set; }
}

public class UpdateHotelDto
{
    public string Nume { get; set; } = string.Empty;
    public string Destinatie { get; set; } = string.Empty;
    public string Locatie { get; set; } = string.Empty;
    public string Descriere { get; set; } = string.Empty;
    public string Facilitati { get; set; } = string.Empty;
    public string TipMasa { get; set; } = string.Empty;
    public string TipUnitate { get; set; } = string.Empty;
    public string CategorieOferta { get; set; } = string.Empty;
    public string ImagineUrl { get; set; } = string.Empty;
    public int Stele { get; set; }
    public StatusHotel Status { get; set; }
}

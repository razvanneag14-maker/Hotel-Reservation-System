namespace HotelReservation.Api.DTOs;

public class CreateTuristDto
{
    public string Nume { get; set; } = string.Empty;
    public string Prenume { get; set; } = string.Empty;
    public string CNP { get; set; } = string.Empty;
    public int Varsta { get; set; }
}

public class CreateReservationDto
{
    public int ClientId { get; set; }
    public int CameraId { get; set; }
    public DateTime DataCheckIn { get; set; }
    public int Nopti { get; set; }
    public int Adulti { get; set; }
    public int Copii { get; set; }
    public List<CreateTuristDto> Turisti { get; set; } = new();
}

public class ReservationResponseDto
{
    public int Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal PretTotal { get; set; }
}

import React, { useState } from 'react';
import { useStoreHotels } from '../../common/stores/useStoreHotels';
import { useStoreAuth } from '../../common/stores/useStoreAuth';
import { useStoreBookings } from '../../common/stores/useStoreBookings';
import { useToast } from '../../components/ui/Toast/Toast';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { Modal } from '../../components/ui/Modal/Modal';
import { StarRating } from '../../components/filters/StarRating/StarRating';
import type { Camera } from '../../common/types/hotel';
import type { Rezervare } from '../../common/types/booking';
import { TipPlata } from '../../common/types/booking';
import {
  formatPrice,
  getLowestPrice,
  formatDistance,
  formatStatus,
  formatRoomType,
} from '../../utils/formatters';
import { COLORS } from '../../common/constants/colors';
import './HotelDetailScreen.css';

interface HotelDetailScreenProps {
  hotelId: string;
  onNavigate: (path: string) => void;
}

export const HotelDetailScreen: React.FC<HotelDetailScreenProps> = ({ hotelId, onNavigate }) => {
  const { getHotelById } = useStoreHotels();
  const { isAuthenticated, currentUser } = useStoreAuth();
  const { addBooking } = useStoreBookings();
  const { showToast } = useToast();
  const hotel = getHotelById(hotelId);

  const [bookingRoom, setBookingRoom] = useState<Camera | null>(null);
  const [bookCheckIn, setBookCheckIn] = useState('');
  const [bookCheckOut, setBookCheckOut] = useState('');

  const today = new Date().toISOString().split('T')[0];

  if (!hotel) {
    return (
      <div className="hotel-detail-screen" style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ color: COLORS.textHeading, fontFamily: "'Playfair Display', serif" }}>
          Hotel Not Found
        </h2>
        <p style={{ color: COLORS.textMuted, margin: '12px 0 24px' }}>
          The hotel you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="outline" onClick={() => onNavigate('/')}>
          Back to Hotels
        </Button>
      </div>
    );
  }

  const handleBookNow = (camera: Camera) => {
    if (!isAuthenticated) {
      showToast('warning', 'Sign in Required', 'Please sign in to book a room.');
      onNavigate('/login');
      return;
    }
    setBookingRoom(camera);
    setBookCheckIn('');
    setBookCheckOut('');
  };

  const handleConfirmBooking = () => {
    if (!bookingRoom || !bookCheckIn || !bookCheckOut) {
      showToast('error', 'Missing Dates', 'Please select both check-in and check-out dates.');
      return;
    }

    // Calculate total price
    const checkInDate = new Date(bookCheckIn);
    const checkOutDate = new Date(bookCheckOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) {
      showToast('error', 'Invalid Dates', 'Check-out must be after check-in.');
      return;
    }

    const totalPrice = nights * bookingRoom.pretPerNoapte;

    const booking: Rezervare = {
      dataCheckIn: bookCheckIn,
      dataCheckOut: bookCheckOut,
      status: 'CONFIRMED',
      pretTotal: totalPrice,
      cameraRezervata: bookingRoom,
      detaliiPlata: {
        suma: totalPrice,
        tip: TipPlata.CARD_CREDIT,
      },
    };

    addBooking(booking);
    setBookingRoom(null);
    showToast(
      'success',
      'Booking Confirmed! 🎉',
      `Room #${bookingRoom.numar} booked for ${nights} night${nights > 1 ? 's' : ''} — Total: ${formatPrice(totalPrice)}`
    );
  };

  const statusVariant = hotel.status === 'DESCHIS' ? 'success' : hotel.status === 'IN_RENOVARE' ? 'warning' : 'error';

  return (
    <div className="hotel-detail-screen">
      {/* Hero Image */}
      <div className="hotel-detail-hero">
        <img className="hotel-detail-hero-img" src={hotel.imagine} alt={hotel.name} />
        <div className="hotel-detail-hero-overlay" />
        <button className="hotel-detail-back-btn" onClick={() => onNavigate('/')}>
          ←
        </button>
      </div>

      <div className="hotel-detail-content">
        {/* Header */}
        <div className="hotel-detail-header">
          <div>
            <h1 className="hotel-detail-name">{hotel.name}</h1>
            <p className="hotel-detail-location">📍 {hotel.locatie}</p>
          </div>
          <div className="hotel-detail-stars-price">
            <StarRating rating={hotel.stele} size={20} />
            <div className="hotel-detail-price">
              {formatPrice(getLowestPrice(hotel.camere))}
            </div>
            <div className="hotel-detail-price-label">per night, starting from</div>
          </div>
        </div>

        {/* Tags */}
        <div className="hotel-detail-tags">
          <Badge variant={statusVariant}>{formatStatus(hotel.status)}</Badge>
          {hotel.allInclusive && <Badge variant="gold">All Inclusive</Badge>}
          {hotel.justBreakfast && <Badge variant="info">Breakfast Included</Badge>}
        </div>

        {/* Description */}
        <div className="hotel-detail-description">{hotel.descriere}</div>

        {/* Info Grid */}
        <h2 className="hotel-detail-section-title">Hotel Information</h2>
        <div className="hotel-detail-info-grid">
          <div className="hotel-detail-info-card">
            <div className="hotel-detail-info-icon">🏖️</div>
            <div className="hotel-detail-info-value">
              {formatDistance(hotel.metri_de_plaja)}
            </div>
            <div className="hotel-detail-info-label">To Beach</div>
          </div>
          <div className="hotel-detail-info-card">
            <div className="hotel-detail-info-icon">🏙️</div>
            <div className="hotel-detail-info-value">
              {formatDistance(hotel.metri_de_centrul_orasului)}
            </div>
            <div className="hotel-detail-info-label">To City Center</div>
          </div>
          <div className="hotel-detail-info-card">
            <div className="hotel-detail-info-icon">🎡</div>
            <div className="hotel-detail-info-value">
              {formatDistance(hotel.metri_de_atractii_turistice)}
            </div>
            <div className="hotel-detail-info-label">To Attractions</div>
          </div>
          <div className="hotel-detail-info-card">
            <div className="hotel-detail-info-icon">🛏️</div>
            <div className="hotel-detail-info-value">{hotel.camere.length}</div>
            <div className="hotel-detail-info-label">Total Rooms</div>
          </div>
        </div>

        {/* Facilities */}
        <h2 className="hotel-detail-section-title">Facilities</h2>
        <div className="hotel-detail-facilities">
          {hotel.facilitati.map((f) => (
            <span key={f} className="hotel-detail-facility">{f}</span>
          ))}
        </div>

        {/* Rooms Table */}
        <h2 className="hotel-detail-section-title">Available Rooms</h2>
        <table className="hotel-detail-rooms-table">
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Room #</th>
              <th>Floor</th>
              <th>Price/Night</th>
              <th>Status</th>
              <th>Amenities</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotel.camere.map((camera) => (
              <tr key={camera.numar}>
                <td style={{ fontWeight: 600 }}>{formatRoomType(camera.tip)}</td>
                <td>#{camera.numar}</td>
                <td>Floor {camera.etaj}</td>
                <td style={{ color: COLORS.gold, fontWeight: 700 }}>
                  {formatPrice(camera.pretPerNoapte)}
                </td>
                <td>
                  <Badge variant={camera.disponibilitate ? 'success' : 'error'}>
                    {camera.disponibilitate ? 'Available' : 'Occupied'}
                  </Badge>
                </td>
                <td>
                  <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                    {camera.facilitati.join(', ')}
                  </span>
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!camera.disponibilitate}
                    onClick={() => handleBookNow(camera)}
                  >
                    Book Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Booking Modal ─────────────────────── */}
      <Modal
        isOpen={bookingRoom !== null}
        onClose={() => setBookingRoom(null)}
        title="Reserve Room"
      >
        {bookingRoom && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Room Summary */}
            <div
              style={{
                padding: '16px',
                background: COLORS.bgGlass,
                borderRadius: '10px',
                border: `1px solid ${COLORS.borderLight}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: COLORS.textHeading }}>
                  {formatRoomType(bookingRoom.tip)} — Room #{bookingRoom.numar}
                </span>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>
                  {formatPrice(bookingRoom.pretPerNoapte)}/night
                </span>
              </div>
              <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                {hotel.name} · Floor {bookingRoom.etaj}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '6px' }}>
                Amenities: {bookingRoom.facilitati.join(', ')}
              </div>
            </div>

            {/* Date Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: COLORS.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={bookCheckIn}
                  min={today}
                  onChange={(e) => setBookCheckIn(e.target.value)}
                  style={{
                    padding: '12px 14px',
                    border: `1px solid ${COLORS.borderLight}`,
                    borderRadius: '8px',
                    background: COLORS.bgInput,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: COLORS.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={bookCheckOut}
                  min={bookCheckIn || today}
                  onChange={(e) => setBookCheckOut(e.target.value)}
                  style={{
                    padding: '12px 14px',
                    border: `1px solid ${COLORS.borderLight}`,
                    borderRadius: '8px',
                    background: COLORS.bgInput,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Price Preview */}
            {bookCheckIn && bookCheckOut && (
              <div
                style={{
                  padding: '14px 16px',
                  background: 'rgba(196, 154, 60, 0.1)',
                  borderRadius: '10px',
                  border: `1px solid ${COLORS.borderGold}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: COLORS.textSecondary, fontSize: '14px' }}>
                  {Math.ceil(
                    (new Date(bookCheckOut).getTime() - new Date(bookCheckIn).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  night{Math.ceil(
                    (new Date(bookCheckOut).getTime() - new Date(bookCheckIn).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) > 1
                    ? 's'
                    : ''}{' '}
                  × {formatPrice(bookingRoom.pretPerNoapte)}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: COLORS.gold }}>
                  Total:{' '}
                  {formatPrice(
                    Math.ceil(
                      (new Date(bookCheckOut).getTime() - new Date(bookCheckIn).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) * bookingRoom.pretPerNoapte
                  )}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: COLORS.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Payment Method
              </label>
              <div
                style={{
                  padding: '12px 14px',
                  border: `1px solid ${COLORS.borderLight}`,
                  borderRadius: '8px',
                  background: COLORS.bgInput,
                  color: COLORS.textPrimary,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                }}
              >
                💳 Credit Card
              </div>
            </div>

            {/* Logged in as */}
            <div style={{ fontSize: '13px', color: COLORS.textMuted }}>
              Booking as: <strong style={{ color: COLORS.textPrimary }}>{currentUser?.name}</strong> ({currentUser?.email})
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px' }}>
              <Button variant="ghost" onClick={() => setBookingRoom(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmBooking}
                disabled={!bookCheckIn || !bookCheckOut}
              >
                Confirm Reservation
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

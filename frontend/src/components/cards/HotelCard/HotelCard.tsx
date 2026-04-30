import React from 'react';
import type { Hotel } from '../../../common/types/hotel';
import { useStoreAuth } from '../../../common/stores/useStoreAuth';
import { Badge } from '../../ui/Badge/Badge';
import { Button } from '../../ui/Button/Button';
import { formatPrice, getLowestPrice, formatStatus } from '../../../utils/formatters';
import { COLORS } from '../../../common/constants/colors';
import './HotelCard.css';

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (id: string) => void;
  onEdit?: (hotel: Hotel) => void;
  onDelete?: (id: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const { isAdmin } = useStoreAuth();
  const lowestPrice = getLowestPrice(hotel.camere);
  const availableRooms = hotel.camere.filter((c) => c.disponibilitate).length;

  const statusVariant = hotel.status === 'DESCHIS' ? 'success' : hotel.status === 'IN_RENOVARE' ? 'warning' : 'error';

  return (
    <div
      className="hotel-card"
      onClick={() => onViewDetails(hotel.id)}
      id={`hotel-card-${hotel.id}`}
    >
      {/* Admin action buttons */}
      {isAdmin && (
        <div className="hotel-card-admin-actions">
          <button
            className="hotel-card-admin-btn edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(hotel);
            }}
            title="Edit hotel"
          >
            ✎
          </button>
          <button
            className="hotel-card-admin-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(hotel.id);
            }}
            title="Delete hotel"
          >
            🗑
          </button>
        </div>
      )}

      {/* Hotel Image */}
      <img
        className="hotel-card-image"
        src={hotel.imagine}
        alt={hotel.name}
        loading="lazy"
      />

      <div className="hotel-card-body">
        {/* Name + Stars */}
        <div className="hotel-card-top-row">
          <h3 className="hotel-card-name">{hotel.name}</h3>
          <div className="hotel-card-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="hotel-card-star"
                style={{ color: i < hotel.stele ? COLORS.starFilled : COLORS.starEmpty }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Location */}
        <p className="hotel-card-location">📍 {hotel.locatie}</p>

        {/* Tags */}
        <div className="hotel-card-tags">
          <Badge variant={statusVariant}>{formatStatus(hotel.status)}</Badge>
          {hotel.allInclusive && <Badge variant="gold">All Inclusive</Badge>}
          {hotel.justBreakfast && <Badge variant="info">Breakfast Included</Badge>}
          <Badge variant="neutral">{availableRooms}/{hotel.camere.length} rooms</Badge>
        </div>

        {/* Facilities (show first 4) */}
        <div className="hotel-card-facilities">
          {hotel.facilitati.slice(0, 4).map((f) => (
            <span key={f} className="hotel-card-facility">{f}</span>
          ))}
          {hotel.facilitati.length > 4 && (
            <span className="hotel-card-facility">+{hotel.facilitati.length - 4} more</span>
          )}
        </div>

        {/* Footer: Price + Book */}
        <div className="hotel-card-footer">
          <div className="hotel-card-price">
            <span className="hotel-card-price-label">From</span>
            <span className="hotel-card-price-value">
              {formatPrice(lowestPrice)}
              <span className="hotel-card-price-unit"> / night</span>
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(hotel.id);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

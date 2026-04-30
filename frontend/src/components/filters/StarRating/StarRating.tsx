import React from 'react';
import { COLORS } from '../../../common/constants/colors';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 18,
  interactive = false,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          onClick={() => interactive && onChange?.(i + 1)}
          style={{
            fontSize: `${size}px`,
            color: i < rating ? COLORS.starFilled : COLORS.starEmpty,
            cursor: interactive ? 'pointer' : 'default',
            transition: 'color 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (interactive) {
              (e.target as HTMLElement).style.transform = 'scale(1.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (interactive) {
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

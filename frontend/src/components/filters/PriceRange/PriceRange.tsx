import React from 'react';
import { COLORS } from '../../../common/constants/colors';

interface PriceRangeProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
  label?: string;
  formatValue?: (val: number) => string;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  onMinChange,
  onMaxChange,
  label = 'Price per night',
  formatValue = (v) => `€${v}`,
}) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    appearance: 'none' as const,
    height: '4px',
    borderRadius: '2px',
    background: COLORS.bgInput,
    outline: 'none',
    cursor: 'pointer',
    accentColor: COLORS.gold,
  };

  return (
    <div style={{ marginBottom: '4px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>{label}</span>
        <span style={{ fontSize: '13px', color: COLORS.gold, fontWeight: 600 }}>
          {formatValue(currentMin)} — {formatValue(currentMax)}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onChange={(e) => onMinChange(Math.min(Number(e.target.value), currentMax - 10))}
          style={inputStyle}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={(e) => onMaxChange(Math.max(Number(e.target.value), currentMin + 10))}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

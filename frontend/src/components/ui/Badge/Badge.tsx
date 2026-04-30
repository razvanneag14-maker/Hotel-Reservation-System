import React from 'react';
import { COLORS } from '../../../common/constants/colors';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'gold' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: React.CSSProperties;
}

const variantMap: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: COLORS.successBg, color: COLORS.success },
  warning: { bg: COLORS.warningBg, color: COLORS.warning },
  error: { bg: COLORS.errorBg, color: COLORS.error },
  info: { bg: COLORS.infoBg, color: COLORS.info },
  gold: { bg: COLORS.goldMuted, color: COLORS.gold },
  neutral: { bg: COLORS.bgGlass, color: COLORS.textSecondary },
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', style }) => {
  const { bg, color } = variantMap[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.3px',
        backgroundColor: bg,
        color,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

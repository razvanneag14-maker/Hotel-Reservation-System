import React from 'react';
import { COLORS } from '../../../common/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: COLORS.gradientGold,
    color: COLORS.textOnGold,
    border: 'none',
  },
  secondary: {
    background: COLORS.bgGlass,
    color: COLORS.textPrimary,
    border: `1px solid ${COLORS.borderLight}`,
  },
  outline: {
    background: 'transparent',
    color: COLORS.gold,
    border: `1px solid ${COLORS.borderGold}`,
  },
  danger: {
    background: COLORS.error,
    color: COLORS.white,
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: COLORS.textSecondary,
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '13px' },
  md: { padding: '10px 22px', fontSize: '14px' },
  lg: { padding: '14px 32px', fontSize: '16px' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  disabled,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.25s ease',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'inherit',
    letterSpacing: '0.3px',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button style={baseStyle} disabled={disabled} {...props}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

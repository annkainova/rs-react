import React from 'react';
import cn from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  isMain?: boolean;
  disabled?: boolean;
  isGrey?: boolean;
  isOutline?: boolean;
  isAсtiveState?: boolean;
  role?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isMain,
  disabled,
  isGrey,
  isOutline,
  isAсtiveState,
  role,
}) => (
  <button
    onClick={onClick}
    type="submit"
    className={cn(
      isMain ? cl.buttonMain : cl.buttonSqr,
      isGrey && cl.btnGrey,
      isOutline && cl.btnOutline,
      isAсtiveState && cl.btnActive,
      cl.button
    )}
    disabled={disabled}
    role={role}
  >
    {children}
  </button>
);
export default Button;

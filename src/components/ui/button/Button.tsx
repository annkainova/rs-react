import React from 'react';
import cn from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  isMain?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, isMain, disabled }) => (
  <button
    onClick={onClick}
    type="submit"
    className={cn(isMain ? cl.buttonMain : cl.buttonSqr, cl.button)}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;

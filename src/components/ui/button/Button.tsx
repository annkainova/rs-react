import React from 'react';
import cn from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  isMain?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, isMain }) => (
  <button
    onClick={onClick}
    type="submit"
    className={cn(isMain ? cl.buttonMain : cl.buttonSqr, cl.button)}
  >
    {children}
  </button>
);

export default Button;

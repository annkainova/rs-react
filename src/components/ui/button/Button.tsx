import React from 'react';
import cn from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  isMain?: boolean;
}

class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick, children, isMain } = this.props;
    return (
      <button
        onClick={onClick}
        type="submit"
        className={cn(isMain ? cl.buttonMain : cl.buttonSqr, cl.button)}
      >
        {children}
      </button>
    );
  }
}

export default Button;

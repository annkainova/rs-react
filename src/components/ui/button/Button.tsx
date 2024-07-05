import React from 'react';
import cl from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button type="submit" className={cl.button}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;

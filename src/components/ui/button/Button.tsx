import React from 'react';
import cn from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: unknown) => void;
  children?: React.ReactNode;
  isMain?: boolean;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button
        // isMain={this.props.isMain}
        onClick={this.props.onClick}
        type="submit"
        className={cn(this.props.isMain ? cl.buttonMain : cl.buttonSqr, cl.button)}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;

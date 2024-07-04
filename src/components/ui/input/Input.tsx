import React, { InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  placeholder: string;
  id: string;
}

class Input extends React.Component<InputProps> {
  render() {
    const { type, id, placeholder } = this.props;

    return (
      <div>
        <input data-testid="input" id={id} type={type} placeholder={placeholder} className={cl.input} />
      </div>
    );
  }
}

export default Input;

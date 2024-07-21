import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'checkbox';
  placeholder?: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  value,
  placeholder,
  onChange,
  ...rest
}) => (
  <label className={cl.inputWrapper}>
    <input
      className={classNames({
        [cl.input]: type === 'text',
        [cl.checkbox]: type === 'checkbox',
      })}
      onChange={onChange}
      id={id}
      value={value}
      type={type}
      placeholder={type === 'text' ? placeholder : undefined}
      autoComplete="off"
      {...rest}
    />
    {type === 'checkbox' && <span className={cl.customCheckbox}></span>}
  </label>
);

export default Input;

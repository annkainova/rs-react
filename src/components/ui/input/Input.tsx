import React, { InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';
import SearchIcon from '../../icons/search';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  placeholder?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, id, value, placeholder, onChange }) => (
  <div className={cl.searchBar__input}>
    <SearchIcon />
    <input
      onChange={onChange}
      data-testid="input"
      id={id}
      value={value}
      type={type}
      placeholder={placeholder}
      className={cl.input}
      autoComplete="off"
    />
  </div>
);

export default Input;

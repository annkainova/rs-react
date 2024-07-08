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

class Input extends React.Component<InputProps> {
  render() {
    const { type, id, value, placeholder, onChange } = this.props;
    return (
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
  }
}

export default Input;

import React, { InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';
import SearchIcon from '../../icons/search';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  placeholder: string;
  id: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends React.Component<InputProps> {
  render() {
    const { type, id, placeholder, onChange } = this.props;

    return (
      <div className={cl.searchBar__input}>
        <SearchIcon />
        <input
          onChange={onChange}
          data-testid="input"
          id={id}
          type={type}
          placeholder={placeholder}
          className={cl.input}
        />
      </div>
    );
  }
}

export default Input;

import React, { InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';
import SearchIcon from '../../icons/search';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  placeholder: string;
  id: string;
}

class Input extends React.Component<InputProps> {
  render() {
    const { type, id, placeholder } = this.props;

    return (
      <div className={cl.searchBar__input}>
        <SearchIcon />
        <input data-testid="input" id={id} type={type} placeholder={placeholder} className={cl.input} />
      </div>
    );
  }
}

export default Input;

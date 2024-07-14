import toast, { Toaster } from 'react-hot-toast';
import React, {FC, FormEvent} from 'react';
import { SearchBarProps } from "../../types";
import css from './SearchBar.module.css'


const SearchBar:FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const queryInput = form.elements.namedItem('query') as HTMLInputElement;
    const query = queryInput.value.trim();
    if (query.length === 0) {
      toast.success('Please type something in the search field', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      return;
    }
    
    onSearch(query);    
    form.reset();
  };

  return (
    <>
      <Toaster position='top-center' />
      <header className={css.searchField}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input className={css.input} type="text" name="query"/>
          <button type="submit" className={css.button}>Search</button>
        </form>
      </header>
    </>
  );
}

export default SearchBar;
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const onChangeInput = evt => {
    const { value } = evt.currentTarget;
    setSearch(value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!search) {
      toast.error('Enter text for search.');
      return;
    }
    handleSubmit(search);
    resetForm();
  };
  const resetForm = () => {
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmitForm} className={css.Form}>
        <button type="submit" className={css.Button}>
          <BiSearch size="20" />
        </button>

        <input
          value={search}
          onChange={onChangeInput}
          className={css.Input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { SlMagnifier } from 'react-icons/sl';
import toast from 'react-hot-toast';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const formSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.success('Enter a request!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <Header>
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <SlMagnifier size={22} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

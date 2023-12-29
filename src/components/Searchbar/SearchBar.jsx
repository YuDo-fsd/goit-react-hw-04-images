import { Component } from 'react';
import {
  SearchBarHeader,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SerchBarInput,
} from './SearchBar.styled';
import { Notify } from 'notiflix';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (!query) {
      Notify.failure('Enter the request');
      return;
    }

    this.props.onSubmit(query);
  };

  handleChange = el => {
    this.setState({ query: el.currentTarget.value.trim() });
  };

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <SearchBarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SerchBarInput
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

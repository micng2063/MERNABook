import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchBar } from '../general/search/searchBar';

test('SearchBar component renders input field', () => {
  const { getByPlaceholderText } = render(
    <Router>
      <SearchBar setResults={() => {}} setShowResults={() => {}} />
    </Router>
  );

  const inputElement = getByPlaceholderText('Search for textbooks by title, author, etc.');
  expect(inputElement).toBeTruthy();
});

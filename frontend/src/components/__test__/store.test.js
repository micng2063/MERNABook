import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component
import Store from '../store/Store';

test('Store component renders #1', () => {
  const { getByText } = render(
    <Router>
      <Store />
    </Router>
  );
  const exportDataElement = getByText('Filter by Subject');
  expect(exportDataElement).toBeTruthy();
});

test('Store component renders #2', () => {
  const { getByText } = render(
    <Router>
      <Store />
    </Router>
  );
  const exportDataElement = getByText('Filter by Price');
  expect(exportDataElement).toBeTruthy();
});

test('Store component renders #3', () => {
  const { getByText } = render(
    <Router>
      <Store />
    </Router>
  );
  const exportDataElement = getByText('Sort by');
  expect(exportDataElement).toBeTruthy();
});

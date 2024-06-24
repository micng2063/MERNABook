import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingCartProvider } from "../shoppingCart/CartContext";
import Products from '../store/ProductListing';

test('Products component renders check #1', () => {
  const { getByText } = render(
    <Router>
      <ShoppingCartProvider>
        <Products />
      </ShoppingCartProvider>
    </Router>
  );

  const exportDataElement = getByText('Sort by');
  expect(exportDataElement).toBeTruthy();
});

test('Products component renders check #2', () => {
  const { getByText } = render(
    <Router>
      <ShoppingCartProvider>
        <Products />
      </ShoppingCartProvider>
    </Router>
  );

  const exportDataElement = getByText('Alphabetic A - Z');
  expect(exportDataElement).toBeTruthy();
});

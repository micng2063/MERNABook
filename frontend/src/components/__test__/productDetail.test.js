import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingCartProvider } from "../shoppingCart/CartContext";
import Item from '../store/ProductDetail';

test('Item component renders check #1', () => {
  const { getByText } = render(
    <Router>
      <ShoppingCartProvider>
        <Item />
      </ShoppingCartProvider>
    </Router>
  );

  const exportDataElement = getByText('Product Description');
  expect(exportDataElement).toBeTruthy();
});

test('Item component renders check #2', () => {
  const { getByAltText } = render(
    <Router>
      <ShoppingCartProvider>
        <Item />
      </ShoppingCartProvider>
    </Router>
  );
  
  const imageElement = getByAltText('Textbook');
  expect(imageElement).toBeTruthy();
});

test('Item component renders check #3', () => {
  const { getByText } = render(
    <Router>
      <ShoppingCartProvider>
        <Item />
      </ShoppingCartProvider>
    </Router>
  );

  const exportDataElement = getByText('You May Also Like');
  expect(exportDataElement).toBeTruthy();
});


test('Item component renders check #4', () => {
  const { getByText } = render(
    <Router>
      <ShoppingCartProvider>
        <Item />
      </ShoppingCartProvider>
    </Router>
  );

  const exportDataElement = getByText('Add To Cart');
  expect(exportDataElement).toBeTruthy();
});
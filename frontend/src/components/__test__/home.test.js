import React from 'react';
import { render } from '@testing-library/react';
import Home from '../general/home/home';

test('Home component renders chekc #1', () => {
  const { getByText } = render(<Home />);
  const exportDataElement = getByText('Quality Product');
  expect(exportDataElement).toBeTruthy();
});

test('Home component renders chekc #2', () => {
  const { getByText } = render(<Home />);
  const exportDataElement = getByText('New Arrivals');
  expect(exportDataElement).toBeTruthy();
});

test('Home component renders chekc #3', () => {
  const { getByText } = render(<Home />);
  const exportDataElement = getByText('Newsletter');
  expect(exportDataElement).toBeTruthy();
});

test('Home component renders chekc #4', () => {
  const { getByText } = render(<Home />);
  const exportDataElement = getByText('Privacy');
  expect(exportDataElement).toBeTruthy();
});

test('Home component renders chekc #5', () => {
  const { getByAltText } = render(<Home />);
  const imageElement = getByAltText('Wiley');
  expect(imageElement).toBeTruthy();
});

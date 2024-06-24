import React from 'react';
import { render } from '@testing-library/react';
import Inventory from '../admin/dashboard/Inventory';

test('Inventory component renders', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('Export Data');
  expect(exportDataElement).toBeTruthy();
});

test('Inventory component renders Heading', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('Inventory');
  expect(exportDataElement).toBeTruthy();
});

test('Inventory component renders Add new Product component', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('Add new Product');
  expect(exportDataElement).toBeTruthy();
});

test('Inventory component renders Sort By component', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('Sort By');
  expect(exportDataElement).toBeTruthy();
});

test('Inventory component renders Filter by Subjects component', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('All Subjects');
  expect(exportDataElement).toBeTruthy();
});

test('Inventory component renders Filter by Prices component', () => {
  const { getByText } = render(<Inventory />);
  const exportDataElement = getByText('All Prices');
  expect(exportDataElement).toBeTruthy();
});
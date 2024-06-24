import React from 'react';
import { render } from '@testing-library/react';
import Sales from '../admin/dashboard/Sales';

test('Sales component renders', () => {
  const { getByText } = render(<Sales />);
  const exportDataElement = getByText('Monthly Sales Report');
  expect(exportDataElement).toBeTruthy();
});

test('Sales component renders', () => {
  const { getByText } = render(<Sales />);
  const exportDataElement = getByText('Subjects Distribution');
  expect(exportDataElement).toBeTruthy();
});
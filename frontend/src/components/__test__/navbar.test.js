import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../general/navbar/Navbar';

test('Navbar component renders check #1', () => {
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );

  const exportDataElement = getByText('Find Order');
  expect(exportDataElement).toBeTruthy();
});

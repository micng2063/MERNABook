import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../general/footer/footer';

test('Footer test', () => {
  const { getByText } = render(<Footer />);
  
  const getInTouchText = getByText('Get In Touch');
  expect(getInTouchText).toBeTruthy();

  const quickLinksText = getByText('Quick Links');
  expect(quickLinksText).toBeTruthy();

  const myAccountText = getByText('My Account');
  expect(myAccountText).toBeTruthy();

  const newsletterText = getByText('Newsletter');
  expect(newsletterText).toBeTruthy();

  const followUsText = getByText('Follow Us');
  expect(followUsText).toBeTruthy();
});

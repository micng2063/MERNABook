import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Account from '../admin/dashboard/Account';
import { UserContext } from '../user/UserContext'; 

const mockLogOutUser = jest.fn();

test('Account component renders #1', () => {
  const { getByText } = render(
    <Router>
      <UserContext.Provider value={{ logOutUser: mockLogOutUser }}>
        <Account />
      </UserContext.Provider>
    </Router>
  );
  const exportDataElement = getByText('Update Account');
  expect(exportDataElement).toBeTruthy();
});

test('Account component renders #1', () => {
  const { getByLabelText } = render(
    <Router>
      <UserContext.Provider value={{ logOutUser: mockLogOutUser }}>
        <Account />
      </UserContext.Provider>
    </Router>
  );

  const emailInput = getByLabelText('Email');
  expect(emailInput).toBeTruthy();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});
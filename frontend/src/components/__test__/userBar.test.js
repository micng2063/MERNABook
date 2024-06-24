import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserBar from '../user/dashboard/UserBar';
import { UserContext } from '../user/UserContext'; 

const mockLogOutUser = jest.fn();

test('UserBar component renders #1', () => {
  const { getByText } = render(
    <Router>
      <UserContext.Provider value={{ logOutUser: mockLogOutUser }}>
        <UserBar />
      </UserContext.Provider>
    </Router>
  );
  const exportDataElement = getByText('Account Details');
  expect(exportDataElement).toBeTruthy();
});


test('UserBar component renders #2', () => {
  const { getByText } = render(
    <Router>
      <UserContext.Provider value={{ logOutUser: mockLogOutUser }}>
        <UserBar />
      </UserContext.Provider>
    </Router>
  );
  const exportDataElement = getByText('Logout');
  expect(exportDataElement).toBeTruthy();
});


test('Admin UserBar component renders #3', () => {
  const { getByText } = render(
    <Router>
      <UserContext.Provider value={{ logOutUser: mockLogOutUser }}>
        <UserBar />
      </UserContext.Provider>
    </Router>
  );
  const exportDataElement = getByText('Security');
  expect(exportDataElement).toBeTruthy();
});

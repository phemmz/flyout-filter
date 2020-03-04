import React from 'react';
import Header from '../components/Header';

import { render, fireEvent } from '@testing-library/react';

describe('Header', () => {
  it('should call toggleSideNav', () => {
    const toggleSideNav = jest.fn();
    const { queryByText } = render(<Header toggleSideNav={toggleSideNav} />);

    fireEvent.click(queryByText('Filter'));
    expect(toggleSideNav).toHaveBeenCalled();
  });
});

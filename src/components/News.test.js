import React from 'react';
import { render } from '@testing-library/react';
import News from './News';

// Example mock function for testing
const mockFetchNews = jest.fn(() => Promise.resolve([{ title: 'Mock News' }]));

// Example test using the mock function
it('calls mockFetchNews when News mounts', () => {
  // You can pass mockFetchNews as a prop if News expects a fetch function
  render(<News fetchNews={mockFetchNews} />);
  expect(mockFetchNews).toHaveBeenCalled();
});

// Add more tests as needed

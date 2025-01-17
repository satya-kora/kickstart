import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  // Mock the fetch call
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { 's.no': 0, 'percentage.funded': 186, 'amt.pledged': 15823 },
        { 's.no': 1, 'percentage.funded': 8, 'amt.pledged': 6859 },
        { 's.no': 2, 'percentage.funded': 120, 'amt.pledged': 12453 },
        { 's.no': 3, 'percentage.funded': 75, 'amt.pledged': 8321 },
        { 's.no': 4, 'percentage.funded': 200, 'amt.pledged': 18000 },
        { 's.no': 5, 'percentage.funded': 50, 'amt.pledged': 5000 }
      ])
    })
  );
});

afterEach(() => {
  // Clear the fetch mock after each test
  jest.clearAllMocks();
});

describe('App Component', () => {
  test('renders table with projects', async () => {
    render(<App />);
    
    // Wait for the data to load and check for the table element
    await waitFor(() => screen.getByRole('table'));
    
    // Find a cell containing the 'amt.pledged' value and verify it
    const pledgedCell = await screen.findByText('15823');
    
    // Single expect statement to verify the pledged amount
    expect(pledgedCell).toBeInTheDocument();
  });

  test('pagination works correctly', async () => {
    render(<App />);
  
    // Wait for the table to render and ensure there are enough rows for pagination
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1); // Ensure at least header + 1 row
    });
  
    // Check that 6 rows are rendered initially (1 header + 5 data rows)
    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6); // 1 header + 5 data rows
  
    // Click the "Next Page" button
    const nextPageButton = screen.getByLabelText(/next page/i);
    fireEvent.click(nextPageButton);
  
    // Wait for the rows to be updated after clicking Next
    await waitFor(() => {
      rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1); // Ensure rows are loaded
    });
  
    // Ensure Next button is disabled and Previous button is enabled after Next page
    expect(nextPageButton).toBeDisabled();
    const previousPageButton = screen.getByLabelText(/previous page/i);
    expect(previousPageButton).toBeEnabled();
  
    // Click the "Previous Page" button
    fireEvent.click(previousPageButton);
  
    // Wait for the rows to be updated after clicking Previous
    await waitFor(() => {
      rows = screen.getAllByRole('row');
      expect(rows.length).toBe(6); // Ensure we are back to the first page
    });
  
    // Ensure Previous button is disabled on the first page
    expect(previousPageButton).toBeDisabled();
  });
  
  

  test('displays the correct percentage funded', async () => {
    render(<App />);
    
    // Wait for the table to render
    await waitFor(() => screen.getByRole('table'));
    
    // Find a cell containing the percentage funded value and verify it
    const percentageCell = await screen.findByText('186%');
    
    // Verify if the percentage funded value appears correctly
    expect(percentageCell).toBeInTheDocument();
  });

  test('renders the correct total rows', async () => {
    // Wrapping the test in 'act()' to handle asynchronous state updates
    await act(async () => {
      render(<App />);
    });
  
    // Wait for the rows to load after the fetch
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // We expect to have 6 rows (5 data rows + 1 header row)
      expect(rows.length).toBe(6);  // 5 data rows + 1 header row
    });
  });

  test('shows correct table headers', async () => {
    render(<App />);
    
    // Wait for the table to be rendered
    await waitFor(() => screen.getByRole('table'));
    
    // Check for specific column headers
    const headerCells = screen.getAllByRole('columnheader');
    
    // Verify the headers for S.No., Percentage Funded, and Amount Pledged
    expect(headerCells[0]).toHaveTextContent('S.No.');
    expect(headerCells[1]).toHaveTextContent('Percentage Funded');
    expect(headerCells[2]).toHaveTextContent('Amount Pledged');
  });
});

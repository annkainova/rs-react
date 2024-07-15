import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SearchBar from '../../../../components/searchBar/searchBar';
import '@testing-library/jest-dom';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('saves entered value to local storage when search button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search More');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('test query');
  });

  it('retrieves value from local storage when component mounts', () => {
    localStorage.setItem('searchQuery', 'stored query');

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search More');
    expect(input).toHaveValue('stored query');
  });
});

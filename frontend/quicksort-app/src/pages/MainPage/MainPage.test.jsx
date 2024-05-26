import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Main from './MainPage'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('main page', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders input fields and button', () => {
    render(<Main />);
    expect(screen.getByPlaceholderText('Length (Optional)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Data (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Select Algorithm')).toBeInTheDocument();
    expect(screen.getByTestId('run-qs-button')).toBeInTheDocument();
  });

  it('displays error message when invalid input is provided', () => {
    render(<Main />);
    const button = screen.getByTestId('run-qs-button');

    fireEvent.click(button);
    expect(screen.getByText('Please choose the algorithm.')).toBeInTheDocument();
  });
})
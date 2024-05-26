import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('renders the MainPage component for the "/" route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Quicksort illustation')).toBeInTheDocument();
  });

  it('renders the Tutorial component for the "/tutorial" route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Tutorial'));
    expect(screen.getByText('Quick Sort Tutorials')).toBeInTheDocument();
  });

  it('renders the Test component for the "/test" route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Test'));
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders the About component for the "/about" route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });
})
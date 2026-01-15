import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  describe('Rendering', () => {
    it('should render successfully when component is mounted', () => {
      render(<ErrorState error="Something went wrong" onRetry={mockOnRetry} />);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should display error message when error prop is provided', () => {
      const errorMessage = 'Failed to load data';
      render(<ErrorState error={errorMessage} onRetry={mockOnRetry} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should render AlertCircle icon when component is rendered', () => {
      const { container } = render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('should render Try Again button when component is rendered', () => {
      render(<ErrorState error="Error occurred" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toBeInTheDocument();
    });

    it('should render RefreshCw icon inside button when button is rendered', () => {
      const { container } = render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should display custom error message when error prop is passed', () => {
      const customError = 'Network connection failed';
      render(<ErrorState error={customError} onRetry={mockOnRetry} />);
      expect(screen.getByText(customError)).toBeInTheDocument();
    });

    it('should display empty text when error prop is empty string', () => {
      render(<ErrorState error="" onRetry={mockOnRetry} />);
      const text = screen.queryByText('Something went wrong');
      expect(text).not.toBeInTheDocument();
    });

    it('should display full text when error prop contains long text', () => {
      const longError = 'This is a very long error message that describes what went wrong in great detail and should still be displayed correctly in the error state component';
      render(<ErrorState error={longError} onRetry={mockOnRetry} />);
      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it('should accept onRetry callback prop when component is initialized', () => {
      const customRetry = jest.fn();
      render(<ErrorState error="Error" onRetry={customRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should call onRetry callback when Try Again button is clicked', () => {
      render(<ErrorState error="Error occurred" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(button);
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('should call onRetry callback multiple times when button is clicked multiple times', () => {
      render(<ErrorState error="Error occurred" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(mockOnRetry).toHaveBeenCalledTimes(3);
    });

    it('should call correct callback when different onRetry functions are passed', () => {
      const firstRetry = jest.fn();
      const { rerender } = render(<ErrorState error="Error" onRetry={firstRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(button);
      expect(firstRetry).toHaveBeenCalledTimes(1);

      const secondRetry = jest.fn();
      rerender(<ErrorState error="Error" onRetry={secondRetry} />);
      fireEvent.click(button);
      expect(secondRetry).toHaveBeenCalledTimes(1);
      expect(firstRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Structure', () => {
    it('should render as h6 element when Typography component is rendered', () => {
      render(<ErrorState error="Test error" onRetry={mockOnRetry} />);
      const typography = screen.getByText('Test error');
      expect(typography.tagName).toBe('H6');
    });

    it('should apply font weight 600 when component is styled', () => {
      render(<ErrorState error="Test" onRetry={mockOnRetry} />);
      const typography = screen.getByText('Test');
      expect(typography).toHaveStyle({ fontWeight: 600 });
    });

    it('should apply opacity 0.2 to AlertCircle icon when icon is rendered', () => {
      const { container } = render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const alertIcon = container.querySelector('svg');
      expect(alertIcon?.style.opacity).toBe('0.2');
    });

    it('should apply red color to AlertCircle icon when icon is rendered', () => {
      const { container } = render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const alertIcon = container.querySelector('svg');
      expect(alertIcon?.style.color).toBe('rgb(239, 68, 68)');
    });

    it('should apply margin bottom 16px to AlertCircle icon when icon is rendered', () => {
      const { container } = render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const alertIcon = container.querySelector('svg');
      expect(alertIcon?.style.marginBottom).toBe('16px');
    });

    it('should render button with correct text content when button is displayed', () => {
      render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toHaveTextContent('Try Again');
    });
  });

  describe('Accessibility', () => {
    it('should be visible when error message is rendered', () => {
      render(<ErrorState error="Service unavailable" onRetry={mockOnRetry} />);
      expect(screen.getByText('Service unavailable')).toBeVisible();
    });

    it('should render semantic h6 heading when component structure is created', () => {
      const { container } = render(<ErrorState error="Error message" onRetry={mockOnRetry} />);
      const heading = container.querySelector('h6');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Error message');
    });

    it('should render button with accessible role when button is created', () => {
      render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('should have visible button text when button is rendered', () => {
      render(<ErrorState error="Error" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toBeVisible();
    });
  });

  describe('Edge Cases', () => {
    it('should display text correctly when error contains special characters', () => {
      const specialError = 'Error: "@#$%^&*()" caused the failure';
      render(<ErrorState error={specialError} onRetry={mockOnRetry} />);
      expect(screen.getByText(specialError)).toBeInTheDocument();
    });

    it('should display text correctly when error contains HTML entities', () => {
      const errorWithEntities = 'Error: Request failed & connection timeout';
      render(<ErrorState error={errorWithEntities} onRetry={mockOnRetry} />);
      expect(screen.getByText(errorWithEntities)).toBeInTheDocument();
    });

    it('should display numeric string when error prop is a number', () => {
      render(<ErrorState error={'500'} onRetry={mockOnRetry} />);
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('should display text correctly when error contains line breaks', () => {
      const errorWithBreaks = 'Error occurred\nPlease try again';
      render(<ErrorState error={errorWithBreaks} onRetry={mockOnRetry} />);
      expect(screen.getByText(/Error occurred/)).toBeInTheDocument();
      expect(screen.getByText(/Please try again/)).toBeInTheDocument();
    });

    it('should handle unicode characters in error message when special characters are provided', () => {
      const unicodeError = 'Error: 操作失败 🔴';
      render(<ErrorState error={unicodeError} onRetry={mockOnRetry} />);
      expect(screen.getByText(unicodeError)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render each instance independently when multiple instances are created', () => {
      const firstRetry = jest.fn();
      const secondRetry = jest.fn();
      
      const { container } = render(
        <>
          <ErrorState error="First error" onRetry={firstRetry} />
          <ErrorState error="Second error" onRetry={secondRetry} />
        </>
      );
      
      expect(screen.getByText('First error')).toBeInTheDocument();
      expect(screen.getByText('Second error')).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button', { name: /try again/i });
      expect(buttons).toHaveLength(2);
    });

    it('should update error message correctly when component is re-rendered with new props', () => {
      const { rerender } = render(<ErrorState error="First error" onRetry={mockOnRetry} />);
      expect(screen.getByText('First error')).toBeInTheDocument();
      
      rerender(<ErrorState error="Second error" onRetry={mockOnRetry} />);
      expect(screen.getByText('Second error')).toBeInTheDocument();
      expect(screen.queryByText('First error')).not.toBeInTheDocument();
    });

    it('should maintain button functionality when component is re-rendered', () => {
      const { rerender } = render(<ErrorState error="Error 1" onRetry={mockOnRetry} />);
      const button = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(button);
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
      
      rerender(<ErrorState error="Error 2" onRetry={mockOnRetry} />);
      fireEvent.click(button);
      expect(mockOnRetry).toHaveBeenCalledTimes(2);
    });

    it('should work correctly when onRetry callback changes between renders', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();
      
      const { rerender } = render(<ErrorState error="Error" onRetry={firstCallback} />);
      const button = screen.getByRole('button', { name: /try again/i });
      
      fireEvent.click(button);
      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).toHaveBeenCalledTimes(0);
      
      rerender(<ErrorState error="Error" onRetry={secondCallback} />);
      fireEvent.click(button);
      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).toHaveBeenCalledTimes(1);
    });
  });
});

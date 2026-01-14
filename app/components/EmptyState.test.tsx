import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyState from './EmptyState';

describe('EmptyState Component', () => {
  describe('Rendering', () => {
    it('should render successfully when component is mounted', () => {
      render(<EmptyState />);
      expect(screen.getByText('No results match your search')).toBeInTheDocument();
    });

    it('should display default message when no message prop is provided', () => {
      render(<EmptyState />);
      const defaultMessage = screen.getByText('No results match your search');
      expect(defaultMessage).toBeInTheDocument();
      expect(defaultMessage).toHaveTextContent('No results match your search');
    });

    it('should display custom message when message prop is provided', () => {
      const customMessage = 'No users found';
      render(<EmptyState message={customMessage} />);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('should render LayoutGrid icon when component is rendered', () => {
      const { container } = render(<EmptyState />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should display message when custom message prop is passed', () => {
      const message = 'Custom empty state message';
      render(<EmptyState message={message} />);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('should display empty text when message prop is empty string', () => {
      render(<EmptyState message="" />);
      const text = screen.queryByText('No results match your search');
      expect(text).not.toBeInTheDocument();
    });

    it('should display full text when message prop contains long text', () => {
      const longMessage = 'This is a very long message that should still be displayed correctly in the empty state component without any issues';
      render(<EmptyState message={longMessage} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });

  describe('Styling and Structure', () => {
    it('should render as h6 element when Typography component is rendered', () => {
      render(<EmptyState message="Test message" />);
      const typography = screen.getByText('Test message');
      expect(typography.tagName).toBe('H6');
    });

    it('should apply font weight 600 when component is styled', () => {
      render(<EmptyState message="Test" />);
      const typography = screen.getByText('Test');
      expect(typography).toHaveStyle({ fontWeight: 600 });
    });

    it('should apply opacity 0.1 to icon when icon is rendered', () => {
      const { container } = render(<EmptyState />);
      const svg = container.querySelector('svg');
      expect(svg?.style.opacity).toBe('0.1');
    });

    it('should apply margin bottom 16px to icon when icon is rendered', () => {
      const { container } = render(<EmptyState />);
      const svg = container.querySelector('svg');
      expect(svg?.style.marginBottom).toBe('16px');
    });
  });

  describe('Accessibility', () => {
    it('should be visible when message is rendered', () => {
      render(<EmptyState message="No data available" />);
      expect(screen.getByText('No data available')).toBeVisible();
    });

    it('should render semantic h6 heading when component structure is created', () => {
      const { container } = render(<EmptyState />);
      const heading = container.querySelector('h6');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('No results match your search');
    });
  });

  describe('Edge Cases', () => {
    it('should display text correctly when message contains special characters', () => {
      const specialMessage = 'No results for "@#$%^&*()"';
      render(<EmptyState message={specialMessage} />);
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it('should display text correctly when message contains HTML entities', () => {
      const messageWithEntities = 'No results found & nothing to display';
      render(<EmptyState message={messageWithEntities} />);
      expect(screen.getByText(messageWithEntities)).toBeInTheDocument();
    });

    it('should display numeric string when message prop is a number', () => {
      render(<EmptyState message={'0'} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render each instance independently when multiple instances are created', () => {
      const { container } = render(
        <>
          <EmptyState message="First empty state" />
          <EmptyState message="Second empty state" />
        </>
      );
      
      expect(screen.getByText('First empty state')).toBeInTheDocument();
      expect(screen.getByText('Second empty state')).toBeInTheDocument();
      
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
    });

    it('should update message correctly when component is re-rendered with new props', () => {
      const { rerender } = render(<EmptyState message="First message" />);
      expect(screen.getByText('First message')).toBeInTheDocument();
      
      rerender(<EmptyState message="Second message" />);
      expect(screen.getByText('Second message')).toBeInTheDocument();
      expect(screen.queryByText('First message')).not.toBeInTheDocument();
    });
  });
});

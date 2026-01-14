import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <AlertCircle 
        size={64} 
        style={{ 
          opacity: 0.2, 
          marginBottom: 16,
          color: '#ef4444'
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.secondary', 
          fontWeight: 600,
          mb: 1
        }}
      >
        {error}
      </Typography>
      <Button
        onClick={onRetry}
        startIcon={<RefreshCw size={18} />}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
        }}
      >
        Try Again
      </Button>
    </Box>
  );
};

export default ErrorState;

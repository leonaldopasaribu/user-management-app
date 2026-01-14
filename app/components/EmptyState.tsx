import React from 'react';
import { Box, Typography } from '@mui/material';
import { LayoutGrid } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No results match your search' 
}) => {
  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <LayoutGrid size={64} style={{ opacity: 0.1, marginBottom: 16 }} />
      <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;

import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import type { ChangeEvent } from 'react';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchField({
  value,
  onChange,
  placeholder = 'Search users by name, username, email, or company...',
}: SearchFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'rgba(26, 32, 44, 0.6)' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: 3,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          color: '#1a202c',
          '& fieldset': {
            border: 'none',
          },
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.85)',
          },
          '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 0.9)',
          },
        },
        '& .MuiOutlinedInput-input::placeholder': {
          color: 'rgba(26, 32, 44, 0.5)',
          opacity: 1,
        },
      }}
    />
  );
}

export default SearchField;
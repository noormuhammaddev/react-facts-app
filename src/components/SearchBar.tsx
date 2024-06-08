import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Box, TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{maxWidth: '450px', margin: '30px auto 0'}}>
      <TextField
        variant="outlined" 
        placeholder="Search the record..."
        onChange={handleChange}
        required
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;

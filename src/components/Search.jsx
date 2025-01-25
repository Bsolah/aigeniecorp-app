// src/components/Search.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import API from '../api/api';

function Search() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('internal');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await API.post(`/ai/ask`, { query });
    //   const { data } = await API.post(`/ai/${searchType}`, { query });
      setResults(data.result.split("\n") || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">AI-Powered Search</Typography>
      <ToggleButtonGroup
        value={searchType}
        exclusive
        onChange={(e, newType) => setSearchType(newType || searchType)}
        sx={{ mt: 2 }}
      >
        <ToggleButton value="internal">Internal Search</ToggleButton>
        <ToggleButton value="external">External Search</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label="Search Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mt: 2, width: '400px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Results:</Typography>
        {results.length === 0 ? (
          <Typography>No results found.</Typography>
        ) : (
          results?.map((result, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>{result}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Search;

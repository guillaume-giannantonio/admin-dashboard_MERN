import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import FlewBetween from '@/components/FlewBetween.jsx';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <GridToolbarContainer>
      <FlewBetween width="100%">
        <FlewBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlewBetween>
        <TextField
          label="Search..."
          sx={{ mb: '0.5rem', width: '15rem' }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlewBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;

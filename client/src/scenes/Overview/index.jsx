import { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '@/components/Header.jsx';
import OverviewChat from '@/components/OverviewChat.jsx';

function Overview() {
  const [view, setView] = useState('units');
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subTitle="Overview of general revenue and profits"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="view"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChat view={view} />
      </Box>
    </Box>
  );
}

export default Overview;

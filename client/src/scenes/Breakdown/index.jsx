import Header from '@/components/Header.jsx';
import { Box } from '@mui/material';
import BreakdownChart from '@/components/BreakdownChart.jsx';

function Breakdown() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subTitle="Breakdown of sales by category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}

export default Breakdown;

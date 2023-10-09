import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useGetDashboardQuery } from '@/state/api.js';
import FlewBetween from '@/components/FlewBetween.jsx';
import Header from '@/components/Header.jsx';
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from '@mui/icons-material';
import StatBox from '@/components/StatBox.jsx';
import OverviewChart from '@/components/OverviewChat.jsx';
import DataGridCustomToolbar from '@/components/DataGridCustomToolbar.jsx';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from '@/components/BreakdownChart.jsx';

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'UserId',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# Of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <FlewBetween>
        <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlewBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreens ? undefined : 'span 12',
          },
        }}
      >
        <StatBox
          title="Total Customars"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last Month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[200], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Sales today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Sales of today"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[200], fontSize: '26px' }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Sales of this month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[200], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Sales of this year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[200], fontSize: '26px' }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
            '& .MuiDataGrid-row:nth-child(2n)': {
              backgroundColor: `${theme.palette.primary[300]} !important`,
            },
          }}
        >
          <DataGrid
            columns={columns}
            rows={(data && data.transactions) || []}
            loading={isLoading}
            getRowId={(row) => row._id}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography varian="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Break down of real states and informations via category for revenue
            made for this year and total sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

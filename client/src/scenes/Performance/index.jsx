import { useGetUserPerformanceQuery } from '@/state/api.js';
import { Box, useTheme } from '@mui/material';
import Header from '@/components/Header.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

function Performance() {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  console.log(data);
  const theme = useTheme();
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
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
      <Header
        title="PERFORMANCE"
        subTitle="Track your Affiliate Sales Performance"
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
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
            backgroundColor: theme.palette.primary.light,
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
          loading={isLoading || !data}
          columns={columns}
          rows={(data && data.sales) || []}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
}

export default Performance;

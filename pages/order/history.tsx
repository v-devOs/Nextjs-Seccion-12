import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ShopLayout } from '@/components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerClassName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300, sortable: false},

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra informacion si esta pagada la orden',
    width: 200,
    renderCell: ( params: GridRenderCellParams ) => {
      return (
        params.row.paid 
          ? <Chip color='success' label='Pagada' variant='outlined'/>
          : <Chip color='error' label='No Pagada' variant='outlined'/>
      )
    }
  },

  {
    field: 'linkOrder', 
    headerName: 'Ver Orden', 
    width: 100,
    sortable: false,
    renderCell: ( params: GridRenderCellParams ) => {
      return (
        <Link href={`/order/${params.row.id}`} underline='always'>
          Ver Orden
        </Link>
      )
    }
  }
]

const rows = [
  { id: 1,paid: true,   fullname: 'Fernando Herrrea' },
  { id: 2,paid: false, fullname: 'Melissa Flores' },
  { id: 3,paid: true,  fullname: 'Hernando Vallejo' },
  { id: 4,paid: false, fullname: 'Emin Reyes' },
  { id: 5,paid: false, fullname: 'Eduardo Rios' },
  { id: 6,paid: true,  fullname: 'Natalia Herrrea' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'} >
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export default HistoryPage
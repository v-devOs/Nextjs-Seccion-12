import { Divider, Grid, Typography } from "@mui/material"

export const OrderSumary = () => {
  return (
    <Grid container>

      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>${105.36}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>${35.0}</Typography>
      </Grid>
      
      <Divider sx={{ my: 2}}/>

      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="subtitle1">${50.0}</Typography>
      </Grid>
    </Grid>
  )
}

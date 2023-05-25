import { CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database/products";




export default function Home() {
  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Encuentra los mejores productos de Teslo aqui">
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos</Typography>
      


      <Grid container spacing={4}>
        {
          initialData.products.map( product => (
            <Grid item xs={ 5 } sm ={ 4 } key={ product.slug }>
              <CardActionArea>
                <CardMedia
                  component='img'
                  image={ `products/${product.images[0]}` }
                  alt={product.title}
                />
              </CardActionArea>
            </Grid>
          ))
        }
      </Grid>


    </ShopLayout>
  )
}

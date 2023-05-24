import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";


export default function Home() {
  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Encuentra los mejores productos de Teslo aqui">
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos</Typography>

    </ShopLayout>
  )
}

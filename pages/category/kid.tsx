import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";


export default function KidsPage() {

  const { products, isLoading } = useProducts('/products?gender=kid')
  
  return (
    <ShopLayout title="Teslo-Shop - Kid Products Page" pageDescription="Seccion para los niños">
      <Typography variant="h1" component='h1'>Niños</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos</Typography>
      
      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList 
            products={ products }      
          />
      }

    </ShopLayout>
  )
}

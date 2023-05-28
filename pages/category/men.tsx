import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";


export default function MensPage() {

  const { products, isLoading } = useProducts('/products?gender=men')
  
  return (
    <ShopLayout title="Teslo-Shop - Men Products Page" pageDescription="Encuentra los mejores productos de Teslo para hombres">
      <Typography variant="h1" component='h1'>Hombres</Typography>
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

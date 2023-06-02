import { FC, useState } from "react"
import { Box, Button } from "@mui/material"
import { ISize } from "@/interfaces"

interface Props{
  seletedSize?: ISize,
  sizes: ISize[],

  // Method
  onChangeSize: ( size: ISize ) => void
}

export const SizeSelector: FC<Props> = ({ seletedSize, sizes, onChangeSize }) => {
  
  return (
    <Box>
      {
        sizes.map( size => (
          <Button
            key={size}
            size="small"
            color={ seletedSize === size ? 'primary': 'info'}
            onClick={ () => onChangeSize( size )}
          >{size}</Button>
        ))
      }
    </Box>
  )
}

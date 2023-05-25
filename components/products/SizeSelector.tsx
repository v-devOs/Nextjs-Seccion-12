import { FC, useState } from "react"
import { Box, Button } from "@mui/material"
import { ISize } from "@/interfaces"

interface Props{
  seletedSize?: ISize,
  sizes: ISize[],
}

export const SizeSelector: FC<Props> = ({ seletedSize, sizes }) => {
  
  const [currentSize, setCurrentSize] = useState(seletedSize);
  
  return (
    <Box>
      {
        sizes.map( size => (
          <Button
            key={size}
            size="small"
            color={ currentSize === size ? 'primary': 'info'}
            onClick={ () => setCurrentSize( size )}
          >{size}</Button>
        ))
      }
    </Box>
  )
}

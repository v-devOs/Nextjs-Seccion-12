import { FC } from "react"
import { Box, IconButton, Typography } from "@mui/material"

import RemoveCircleOutlined from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlined from '@mui/icons-material/AddCircleOutline'

interface Props{

}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutlined/>
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center'}}> 1 </Typography>
      <IconButton>
        <AddCircleOutlined/>
      </IconButton>
    </Box>
  )
}

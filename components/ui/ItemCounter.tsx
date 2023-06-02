import { FC } from "react"
import { Box, IconButton, Typography } from "@mui/material"

import RemoveCircleOutlined from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlined from '@mui/icons-material/AddCircleOutline'



interface Props{
  currentValue: number,
  maxValue: number,

  //Methods
  updateQuantity: ( newValue: number ) => void
}

type actions = 'Decrement' | 'Increment'

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity}) => {

  const onChangeValue = ( action: actions) => {

    if( action === 'Decrement' && currentValue > 1){
      updateQuantity( currentValue - 1)
    }
    else if( action === 'Increment' && currentValue < maxValue ){
      updateQuantity( currentValue + 1 )
    }
  } 

  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        onClick={ () => onChangeValue('Decrement') }
      >
        <RemoveCircleOutlined/>
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center'}}>{ currentValue }</Typography>
      <IconButton
        onClick={ () => onChangeValue('Increment') }
      >
        <AddCircleOutlined/>
      </IconButton>
    </Box>
  )
}
